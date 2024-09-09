// Import configuration and necessary classes from Appwrite
import conf from "../config/config.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  // Initialize Appwrite client and account properties
  client = new Client();
  account;

  constructor() {
    try {
      // Set up the client with API endpoint and project ID from configuration
      this.client
        .setEndpoint(
          import.meta.env.VITE_APPWRITE_API_ENDPOINT || conf.appwriteApiEndpoint
        )
        .setProject(
          import.meta.env.VITE_APPWRITE_PROJECT_ID || conf.appwriteProjectId
        );

      this.account = new Account(this.client); // Initialize Account instance
    } catch (error) {
      console.error("Error initializing AuthService:", error);
      throw new Error("Failed to initialize AuthService");
    }
  }

  // Create a new user account and log in if successful
  createAccount = async ({ email, password, name }) => {
    try {
      if (!email || !password || !name) {
        throw new Error("Missing required field: email, password, or name");
      }

      const userAccount = await this.account.create(
        ID.unique(), // Generate a unique ID for the user
        email,
        password,
        name
      );

      if (userAccount) {
        return await this.login({ email, password });
      } else {
        throw new Error("Failed to create the account");
      }
    } catch (error) {
      console.error("Error creating account:", error);
      throw new Error("Failed to create account. Please try again.");
    }
  };

  // Log in a user with email and password
  login = async ({ email, password }) => {
    try {
      if (!email || !password) {
        throw new Error("Missing required fields: email or password");
      }

      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return session; // Return the session details on successful login
    } catch (error) {
      console.error("Error logging in:", error);
      throw new Error(
        "Login failed. Please check your credentials and try again."
      );
    }
  };


}

// Export an instance of AuthService
const authService = new AuthService();
export default authService;
