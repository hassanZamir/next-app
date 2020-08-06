// #region Interface Imports
import { UploadMediaFilesPayload, UploadMediaFilesResponse } from "@Interfaces";
// #endregion Interface Imports

declare namespace UploadMediaFilesModel {
    export interface GetUploadMediaFilesPayload extends UploadMediaFilesPayload {}
    export interface GetUploadMediaFilesResponse extends UploadMediaFilesResponse {}
}

export { UploadMediaFilesModel };
