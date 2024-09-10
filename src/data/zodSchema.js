import z from "zod";

const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." }),
});

export default userSchema;
