import * as z from "zod";

export const ThreadValidation = z.object({
  thread: z
    .string()
    .min(5, { message: "Thread must be at least 5 characters." }),
});

export const CommentSchema = z.object({
  thread: z
    .string()
    .min(1, { message: "Comment be at least of 3 characters." }),
});
