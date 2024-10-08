import z from "zod";

/**
 * Zod schemas for validating various data structures.
 * Includes schemas for user data, login data, environment variables, and post data.
 */

// Define schema for user data
const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." }),
});

// Define schema for login data
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
});

// Define schema for environment variables
const envSchema = z.object({
  VITE_APPWRITE_API_ENDPOINT: z.string().url(),
  VITE_APPWRITE_PROJECT_ID: z.string(),
  VITE_APPWRITE_DATABASE_ID: z.string(),
  VITE_APPWRITE_COLLECTION_ID: z.string(),
  VITE_APPWRITE_BUCKET_ID: z.string(),
});

// Define schema for post data
const createPostSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  slug: z.string().min(1, { message: "Slug is required." }),
  content: z.string().min(1, { message: "Content is required." }),
  featuredImage: z.string().url({ message: "Invalid URL for featured image." }),
  status: z.enum(["draft", "published"]).default("draft"),
  userId: z.string().min(1, { message: "User ID is required." }),
});
const updatePostSchema = createPostSchema.omit({ userId: true }).partial(); // For update, all fields are optional except userId

export {
  userSchema,
  loginSchema,
  envSchema,
  updatePostSchema,
  createPostSchema,
};
