import conf from "../config/config";
import { Client, ID, Storage } from "appwrite";
import { logger } from "../data/logger";
import { ServiceError, ValidationError } from "../data/error";

export class FileUploadService {
  client = new Client();
  bucket;

  constructor() {
    try {
      this.client
        .setEndpoint(
          import.meta.env.VITE_APPWRITE_API_ENDPOINT || conf.appwriteApiEndpoint
        )
        .setProject(
          import.meta.env.VITE_APPWRITE_PROJECT_ID || conf.appwriteProjectId
        );
      this.bucket = new Storage(this.client);
    } catch (error) {
      logger.error("Error initializing FileUploadService:", { error });
      throw new ServiceError("Failed to initialize the fileUpload services.");
    }
  }

  uploadFile = async (file) => {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique,
        file
      );
    } catch (error) {
      logger.error("Appwrite serive :: uploadFile :: error", { error });
      throw new ServiceError("Failed to upload file");
    }
  };

  deleteFile = async (fileId) => {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      logger.error("Appwrite Service :: deleteFile :: error", { error });
      throw new ServiceError("Failed to delete file");
    }
  };
}

const fileUploadService = new FileUploadService();
export default fileUploadService;
