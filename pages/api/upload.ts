const multer  = require('multer');
const fs = require('fs');
const uuidv1 = require('uuid/v1');
const sharp = require('sharp');
const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");

const account = "venodev";
const accountKey = "BvPGmzmGeRuJgEXcHvQn+HCI+iuYA5wY8eUhTt5B2vMlODMySKnezgcBRqNcM7x3e9rLIs0UaauMx1HZI8doow==";
// const imagesContainer = 'images';
// const videosContainer = 'videos';
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

function uploadToAzure(file: any, blurImage?: any) {
  return new Promise(async (resolve, reject) => {
    if (!file) reject({ ex: { message: 'File not uploaded' }});

    const isVideo = file.originalname.split(".")[1] === ('mp4' || '3gpp' || 'quicktime');
    const containerClient = await _getContainerClient('veno-media');
    const blobName = (isVideo ? 'videos/' : 'images/') + uuidv1() + '.' + file.originalname.split('.')[1];
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const blobBlurName = blurImage ? 'blur/' + uuidv1() + '.jpg' : null;
    
    try {
      await blockBlobClient.uploadFile(file.path, {
        blockSize: 4 * 1024 * 1024, // 4MB block size
        concurrency: 20, // 20 concurrency
        // onProgress: (ev: any) => console.log(ev)
      });
      if (blobBlurName && blurImage) 
        resolve({ url: blobName, media_type: isVideo ? 2 : 1, thumbnailUrl: blobBlurName });
      else 
        resolve({ url: blobName, type: isVideo ? 2 : 1 });
    } catch (err) {
      reject({ ex: { message: 'File not uploaded', file: file }});
    }
  });
}

const resizeImage = (file: any, width: any, height: any) => {
  return new Promise((resolve, reject) => {
    sharp(file.path)
    .resize(width, height)
    // .jpeg()
    .rotate()
    .toBuffer()
    .then((data: any) =>  {
      const newFilePath = 'uploads/resize/' + file.path.split('uploads/')[1];
      fs.writeFile(newFilePath, data, function (err: any) {
        if (err) reject('Resize Failed .. ' + err);

        const updatedFile = Object.assign({}, file, { path: newFilePath });
        resolve(updatedFile);
      });
    }).catch((err: any) => {
      console.log(err, 'exception in resizings');
      reject('Resize Failed .. ' + err);
      if (fs.exists(file)) {
        fs.unlink(file);
      }
    });
  });
}

const blurImage = (file: any) => {
  return new Promise((resolve, reject) => {
    sharp(file.path)
    .jpeg({
      quality: 1
    })
    .rotate()
    .toBuffer()
    .then((data: any) =>  {
      const newFilePath = 'uploads/resize/' + file.path.split('uploads/')[1];
      fs.writeFile(newFilePath, data, function (err: any) {
        if (err) reject('Resize Failed .. ' + err);

        const updatedFile = Object.assign({}, file, { path: newFilePath });
        resolve(updatedFile);
      });
    }).catch((err: any) => {
      console.log(err, 'exception in resizings');
      reject('Resize Failed .. ' + err);
      if (fs.exists(file)) {
        fs.unlink(file);
      }
    });
  });
}

const dimensions = [[620, 350]];
export default ((req: any, res: any) => {
  const shouldBlur = req.query.blur
  upload(req, res, function (err: any) {
    if (req.fileValidationError) {
      return res.send({ status: false, error: req.fileValidationError });
    } else if (!req.files || req.files.length <= 0) {
      return res.send({ status: false, error: 'Please select an image to upload' });
    }

    const uploadPaths: any = [],
    failedPaths: any = [];
    req.files.forEach(async (file: any, i: number) => {
      const isVideo = file.originalname.split(".")[1] === ('mp4' || '3gpp' || 'quicktime');

      if (isVideo) {
        uploadToAzure(file)
          .then((response: any) => {
            uploadPaths.push(response);
            sendResponse();
          }).catch((ex) => {
            failedPaths.push({ 
              path: ex.file ? ex.file.path.split('##')[1] : ''
            });
            sendResponse();
          });
      } else {
        if (shouldBlur) {
          resizeImage(file, dimensions[0][0], dimensions[0][1])
          .then(function(resizedFile: any) {
            blurImage(file)
              .then(function(blurImage: any) {
                uploadToAzure(resizedFile, blurImage)
                  .then((response: any) => {
                    uploadPaths.push(response);
                    sendResponse();
                  }).catch((ex) => {
                    failedPaths.push({ 
                      path: ex.file ? ex.file.path.split('##')[1] : ''
                    });
                    sendResponse();
                  });
              });
          }).catch(function(ex) {
            failedPaths.push({ 
              path: ex.file ? ex.file.path.split('##')[1] : ''
            });
            sendResponse();
          });
        } else {
          resizeImage(file, dimensions[0][0], dimensions[0][1])
          .then(function(resizedFile: any) {
            uploadToAzure(resizedFile)
              .then((response: any) => {
                uploadPaths.push(response);
                sendResponse();
              }).catch((ex) => {
                failedPaths.push({ 
                  path: ex.file ? ex.file.path.split('##')[1] : ''
                });
                sendResponse();
              });
          })
          .catch(function(ex) {
            failedPaths.push({ 
              path: ex.file ? ex.file.path.split('##')[1] : ''
            });
            sendResponse();
          });
        }
      }
    });

    function sendResponse() {
      if ((uploadPaths.length + failedPaths.length) >= req.files.length) 
        res.end(JSON.stringify({ status: failedPaths.length <= 0 ? true : false, uploadSuccess: uploadPaths, uploadError: failedPaths }));
    }
  });
});

export const config = {
  api: {
    bodyParser: false
  }
}