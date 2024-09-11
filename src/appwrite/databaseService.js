import conf from "../config/config.js";
import { Client, Databases, Query } from "appwrite";
import { logger } from "../data/logger.js";
import { ServiceError, ValidationError } from "../data/error.js";
import { createPostSchema, updatePostSchema } from "../data/zodSchema.js";

// Define an enum for query types
const QueryTypes = Object.freeze({
  STATUS: "status",
});
export class DatabaseService {
  client = new Client();
  databases;
  //   storage;

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
      //   this.storage = new Storage(this.storage);
    } catch (error) {
      logger.error("Error initializing Services:", { error });
      throw new ServiceError("Failed to initialize the databases services.");
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
      logger.error("Appwrite DatabaseService :: createPost :: error", error);
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
      logger.error("Appwrite DatabaseService :: updatePost :: error", error);
      throw new ServiceError("Failed to update post");
    }
  };

  deletePost = async (slug) => {
    if (!slug) {
      throw new ValidationError("Invalid slug provided");
    }
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      logger.error("Appwrite DatabaseService :: deletePost :: error", error);
      throw new ServiceError(`Failed to delete post with slug ${slug}`);
    }
  };

  getPost = async (slug) => {
    if (!slug) {
      throw new ValidationError("Invalid slug provided");
    }
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      logger.error("Appwrite DatabaseService :: getPost :: error", error);
      throw new ServiceError(`Failed to retrieve post with slug ${slug}`);
    }
  };

  getPosts = async (queries = [Query.equal(QueryTypes.STATUS, "active")]) => {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      logger.error("Appwrite DatabaseService :: getPosts :: error", error);
      throw new ServiceError("Failed to retrieve posts");
    }
  };
}

const databaseService = new DatabaseService();
export default databaseService;
