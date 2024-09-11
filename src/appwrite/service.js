import conf from "../config/config.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";
import { logger } from "../data/logger.js";
import { ServiceError, ValidationError } from "../data/error.js";
import { createPostSchema, updatePostSchema } from "../data/zodSchema.js";

export class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    try {
      this.client
        .setEndpoint(
          import.meta.env.VITE_APPWRITE_API_ENDPOINT || conf.appwriteApiEndpoint
        )
        .setProject(
          import.meta.env.VITE_APPWRITE_PROJECT_ID || conf.appwriteProjectId
        );
      this.databases = new Databases(this.client);
      this.storage = new Storage(this.storage);
    } catch (error) {
      logger.error("Error initializing Services:", { error });
      throw new ServiceError("Failed to initialize the services.");
    }
  }

  createPost = async (postData) => {
    const parsed = createPostSchema.safeParse(postData);
    if (!parsed.success) {
      logger.error(
        "Validation failed for createPost:" +
          JSON.stringify(parsed.error.format())
      );
      throw new ValidationError("Invalid post data", parsed.error.format());
    }
    const { slug, ...data } = parsed.data;
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        data
      );
    } catch (error) {
      logger.error("Appwrite Service :: createPost :: error", error);
      throw new ServiceError("Failed to create post");
    }
  };

  updatePost = async (updateData) => {
    const parsed = updatePostSchema.safeParse(updateData);
    if (!parsed.success) {
      logger.error(
        "Validation failed for updatePost:" +
          JSON.stringify(parsed.error.format())
      );
      throw new ValidationError("Invalid update data", parsed.error.format());
    }
    const { slug, ...data } = parsed.data;

    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        data
      );
    } catch (error) {
      logger.error("Appwrite Service :: updatePost :: error", error);
      throw new ServiceError("Failed to update post");
    }
  };
}

const service = new Service();
export default service;
