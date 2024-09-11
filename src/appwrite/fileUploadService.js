import conf from "../config/config";
import { Client, ID, Storage } from "appwrite";
import { logger } from "../data/logger";
import { ServiceError } from "../data/error";

export class FileUploadService {
  constructor() {
    this.client = new Client();
    this.bucket = new Storage(this.client);

    try {
      // Set up the Appwrite client with endpoint and project ID
      this.client
        .setEndpoint(
          import.meta.env.VITE_APPWRITE_API_ENDPOINT || conf.appwriteApiEndpoint
        )
        .setProject(
          import.meta.env.VITE_APPWRITE_PROJECT_ID || conf.appwriteProjectId
        );
    } catch (error) {
      // Log error and throw a custom error if initialization fails
      logger.error("Error initializing FileUploadService:", {
        message: error.message,
      });
      throw new ServiceError("Failed to initialize the file upload service.");
    }
  }

  uploadFile = async (file) => {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(), // Generate a unique ID for the file
        file
      );
    } catch (error) {
      // Log error and throw a custom error if file upload fails
      logger.error("Appwrite Service :: uploadFile :: error", {
        message: error.message,
      });
      throw new ServiceError("Failed to upload file.");
    }
  };

  deleteFile = async (fileId) => {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      // Log error and throw a custom error if file deletion fails
      logger.error("Appwrite Service :: deleteFile :: error", {
        message: error.message,
      });
      throw new ServiceError("Failed to delete file.");
    }
  };

  getFilePreview = (fileId) => {
    try {
      return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
    } catch (error) {
      // Log error and throw a custom error if file preview retrieval fails
      logger.error("Appwrite Service :: getFilePreview :: error", {
        message: error.message,
      });
      throw new ServiceError("Failed to get file preview.");
    }
  };
}

// Create an instance of the FileUploadService
const fileUploadService = new FileUploadService();
export default fileUploadService;
