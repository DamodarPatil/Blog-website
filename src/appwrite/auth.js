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
      throw error;
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
      throw error;
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
      throw error;
    }
  };

  // Get the currently logged-in user details
//   getCurrentUser = async () => {
//     try {
//       const currentUser = await this.account.get();
//       return currentUser;
//     } catch (error) {
//       console.error("Error fetching current user:", error);
//     }
//     return null; // Return null if there's an error fetching the user
//   };

//   //   log out the current user by deleting all sessions
//   logout = async () => {
//     try {
//       await this.account.deleteSessions();
//     } catch (error) {
//       console.error("Appwrite serive :: logout :: error", error);
//     }
//   };
}

const authService = new AuthService();

// Export an instance of AuthService
export default authService;
