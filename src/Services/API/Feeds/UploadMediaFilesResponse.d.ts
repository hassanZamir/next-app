export interface UploadMediaFilesResponse {
    status: boolean;
    error?:string;
    uploadSuccess?: {path: string}[];
    uploadError?: {path: string}[];
}