import { z } from "zod";

// Define schema for environment variables
const envSchema = z.object({
  VITE_APPWRITE_API_ENDPOINT: z.string().url(),
  VITE_APPWRITE_PROJECT_ID: z.string(),
  VITE_APPWRITE_DATABASE_ID: z.string(),
  VITE_APPWRITE_COLLECTION_ID: z.string(),
  VITE_APPWRITE_BUCKET_ID: z.string(),
});

// Load and validate environment variables
const env = envSchema.safeParse(import.meta.env);

if (!env.success) {
  console.error(
    "Invalid environment variables detected. Please check your configuration:",
    JSON.stringify(env.error.format(), null, 2) // Pretty-print the error message for better readability
  );
  throw new Error(
    "Environment variables validation failed. Check the console for details."
  );
}

const conf = {
  appwriteApiEndpoint: env.data.VITE_APPWRITE_API_ENDPOINT,
  appwriteProjectId: env.data.VITE_APPWRITE_PROJECT_ID,
  appwriteDatabaseId: env.data.VITE_APPWRITE_DATABASE_ID,
  appwriteCollectionId: env.data.VITE_APPWRITE_COLLECTION_ID,
  appwriteBucketId: env.data.VITE_APPWRITE_BUCKET_ID,
};

export default conf;
