import * as z from "zod";

export const UserValidation = z.object({
  profile_picture: z.string().min(3, { message: "Please upload a profile" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." })
    .max(30),
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters." })
    .max(30),
  bio: z
    .string()
    .min(4, { message: "Bio must be at least 4 characters." })
    .max(300, { message: "Bio must be maximum 300 characters." }),
});
