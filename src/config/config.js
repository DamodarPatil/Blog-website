import { envSchema } from "../data/zodSchema";

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
