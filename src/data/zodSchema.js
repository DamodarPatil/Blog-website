import z from "zod";

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

export { userSchema, loginSchema, envSchema };
