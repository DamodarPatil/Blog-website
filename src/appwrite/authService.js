import conf from "../config/config.js";
import { Client, Account, ID } from "appwrite";
import { userSchema, loginSchema } from "../data/zodSchema.js";
import { z } from "zod";
import { logger } from "../data/logger.js";
import { AuthError } from "../data/error.js";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    try {
      this.client
        .setEndpoint(
          import.meta.env.VITE_APPWRITE_API_ENDPOINT || conf.appwriteApiEndpoint
        )
        .setProject(
          import.meta.env.VITE_APPWRITE_PROJECT_ID || conf.appwriteProjectId
        );

      this.account = new Account(this.client);
    } catch (error) {
      logger.error("Error initializing AuthService:", { error });
      throw new AuthError("Failed to initialize the authentication service.");
    }
  }

  // Create a new user account and log in if successful
  createAccount = async ({ email, password, name }) => {
    try {
      // Validate input
      userSchema.parse({ email, password, name });

      const userAccount = await this.account.create(
        ID.unique(), // Generate a unique ID for the user
        email,
        password,
        name
      );

      if (userAccount) {
        return await this.login({ email, password });
      } else {
        throw new AuthError("Failed to create the account");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle Zod validation errors
        logger.warn("Validation error:", { error: error.errors });
        throw new AuthError(
          "Invalid input. Please check the provided details."
        );
      } else {
        logger.error("Error creating account:", { error });
        throw new AuthError("Failed to create the account. Please try again.");
      }
    }
  };

  // Log in a user with email and password
  login = async ({ email, password }) => {
    try {
      // validate input
      loginSchema.parse({ email, password });

      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );

      return session;
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors specifically for login
        logger.warn("Validation error:", { error: error.errors });
        throw new AuthError("Invalid email or password format.");
      } else {
        logger.error("Error logging in:", { error });
        throw new AuthError(
          "Login failed. Please check your credentials and try again."
        );
      }
    }
  };

  // Get the currently logged-in user details
  getCurrentUser = async () => {
    try {
      const currentUser = await this.account.get();
      return currentUser;
    } catch (error) {
      logger.error("Error fetching current user:", { error });
      return null; // Return null if there's an error fetching the user
    }
  };

  // Log out the currently logged-in user
  logout = async () => {
    try {
      await this.account.deleteSessions(); // Deletes all sessions
    } catch (error) {
      logger.error("Error logging out:", { error });
      throw new AuthError("Failed to log out. Please try again.");
    }
  };
}

// Create an instance of the AuthService
const authService = new AuthService();

export default authService;
