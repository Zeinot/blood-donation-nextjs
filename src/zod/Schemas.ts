import { z } from "zod";

export const postSchema = z.object({
  criterias: z.string().min(2).max(500),
  city: z.string().min(2).max(50),
  type: z.string().min(2).max(50),
  location: z.string().min(2).max(50),
  date: z.string().min(2).max(50),
});
