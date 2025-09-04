import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3),
  email: z.email(),
  password: z.string().min(8),
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty("University card required"),
});

export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const bookSchema = z.object({
  title: z.string().trim().min(1).max(100),
  author: z.string().trim().min(1).max(100),
  description: z.string().trim().min(10).max(1000),
  genre: z.string().trim().min(2).max(50),
  rating: z.coerce.number().min(1).max(5) as unknown as z.ZodNumber,
  totalCopies: z.coerce.number().int().lte(1000) as unknown as z.ZodNumber,
  coverUrl: z.string().nonempty(),
  coverColor: z
    .string()
    .trim()
    .regex(/^#[0-9a-fA-F]{6}$/i),
  videoUrl: z.string().nonempty(),
  summary: z.string().trim().min(10).max(2000),
});
