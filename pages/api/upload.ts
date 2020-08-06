const multer  = require('multer');
const fs = require('fs');
const uuidv1 = require('uuid/v1');
const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");

const account = process.env.ACCOUNT_NAME || "";
const accountKey = process.env.ACCOUNT_KEY || "";
const imagesContainer = 'images';
const videosContainer = 'videos';
const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  sharedKeyCredential
);

const storage = multer.diskStorage({
  destination: function(req: any, file: any, cb: any) {
    cb(null, 'uploads/');
  },
  filename: function(req: any, file: any, cb: any) {
    cb(null, Date.now() + '##' + (file.originalname ? file.originalname : ''));
  }
});
const upload = multer({ storage: storage, limits: {fileSize: 10000000000} }).array('mediaFiles', 12);

async function _getContainerClient(containerName: string) {
  let i = 1, hasContainer = false;
  for await (const container of blobServiceClient.listContainers()) {
    hasContainer = containerName === container.name;
    if (hasContainer) return blobServiceClient.getContainerClient(container.name);
  }
  const containerClient = blobServiceClient.getContainerClient(containerName);
  containerClient.create();
  return containerClient;
}

function uploadToAzure(file: any) {
  return new Promise(async (resolve, reject) => {
    if (!file) reject({ ex: { message: 'File not uploaded' }});

    const isVideo = file.originalname.split(".")[1] === ('mp4' || '3gpp' || 'quicktime');
    const containerName = isVideo ? videosContainer : imagesContainer;
    const containerClient = await _getContainerClient(containerName);
    const blobName = uuidv1() + '.' + file.originalname.split('.')[1];
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    try {
      await blockBlobClient.uploadFile(file.path, {
        blockSize: 4 * 1024 * 1024, // 4MB block size
        concurrency: 20, // 20 concurrency
        // onProgress: (ev: any) => console.log(ev)
      });
      resolve({ url: blobName, type: isVideo ? 2 : 1 });
    } catch (err) {
      reject({ ex: { message: 'File not uploaded', file: file }});
    }
  });
}

export default ((req: any, res: any) => {
  upload(req, res, function (err: any) {
    if (req.fileValidationError) {
      return res.send({ status: false, error: req.fileValidationError });
    } else if (!req.files || req.files.length <= 0) {
      return res.send({ status: false, error: 'Please select an image to upload' });
    }

    const uploadPaths: any = [],
    failedPaths: any = [];
    req.files.forEach((file: any, i: number) => {
      uploadToAzure(file)
        .then((response: any) => {
          uploadPaths.push(response);
          sendResponse(i);
        }).catch((ex) => {
          failedPaths.push({ 
            path: ex.file ? ex.file.path.split('##')[1] : ''
          });
          sendResponse(i);
        });
    });

    function sendResponse(i: number) {
      if (i >= req.files.length - 1) 
        res.end(JSON.stringify({ status: true, uploadSuccess: uploadPaths, uploadError: failedPaths }));
    }
  });
});

export const config = {
  api: {
    bodyParser: false
  }
}