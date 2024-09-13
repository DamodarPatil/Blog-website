import conf from "../config/config.js";
import { Client, Databases, Query } from "appwrite";
import { logger } from "../data/logger.js";
import { ServiceError, ValidationError } from "../data/error.js";
import { createPostSchema, updatePostSchema } from "../data/zodSchema.js";

/**
 * Service class for interacting with the Appwrite database.
 * Provides methods for creating, updating, deleting, and retrieving posts.
 * Uses Zod schemas for input validation and custom error classes for error handling.
 */

// Define an enum for query types
const QueryTypes = Object.freeze({
  STATUS: "status",
});

export class DatabaseService {
  constructor() {
    this.client = new Client();
    this.databases = new Databases(this.client);

    try {
      // Initialize the Appwrite client with endpoint and project ID
      this.client
        .setEndpoint(
          import.meta.env.VITE_APPWRITE_API_ENDPOINT || conf.appwriteApiEndpoint
        )
        .setProject(
          import.meta.env.VITE_APPWRITE_PROJECT_ID || conf.appwriteProjectId
        );
    } catch (error) {
      // Log error and throw a custom error if initialization fails
      logger.error("Error initializing DatabaseService:", {
        message: error.message,
      });
      throw new ServiceError("Failed to initialize the database service.");
    }
  }

  createPost = async (postData) => {
    const parsed = createPostSchema.safeParse(postData);
    if (!parsed.success) {
      // Log validation errors and throw a custom error
      logger.error("Validation failed for createPost:", {
        errors: parsed.error.format(),
      });
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
      // Log error and throw a custom error if document creation fails
      logger.error("Error creating post:", {
        message: error.message,
      });
      throw new ServiceError("Failed to create post.");
    }
  };

  updatePost = async (updateData) => {
    const parsed = updatePostSchema.safeParse(updateData);
    if (!parsed.success) {
      // Log validation errors and throw a custom error
      logger.error("Validation failed for updatePost:", {
        errors: parsed.error.format(),
      });
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
      // Log error and throw a custom error if document update fails
      logger.error("Error updating post:", {
        message: error.message,
      });
      throw new ServiceError("Failed to update post.");
    }
  };

  deletePost = async (slug) => {
    if (!slug) {
      // Throw a validation error if the slug is invalid
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
      // Log error and throw a custom error if document deletion fails
      logger.error("Error deleting post:", {
        message: error.message,
      });
      throw new ServiceError(`Failed to delete post with slug ${slug}`);
    }
  };

  getPost = async (slug) => {
    if (!slug) {
      // Throw a validation error if the slug is invalid
      throw new ValidationError("Invalid slug provided");
    }
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      // Log error and throw a custom error if document retrieval fails
      logger.error("Error retrieving post:", {
        message: error.message,
      });
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
      // Log error and throw a custom error if documents retrieval fails
      logger.error("Error retrieving posts:", {
        message: error.message,
      });
      throw new ServiceError("Failed to retrieve posts.");
    }
  };
}

const databaseService = new DatabaseService();
export default databaseService;
