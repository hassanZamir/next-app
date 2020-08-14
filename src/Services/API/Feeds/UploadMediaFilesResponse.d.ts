export interface UploadMediaFilesResponse {
    status: boolean;
    error?:string;
    uploadSuccess?: {url: string}[];
    uploadError?: {url: string}[];
}