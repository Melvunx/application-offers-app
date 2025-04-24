import { z } from "better-auth";

export const TypeOfferEnum = z.enum(["JOBBOARD", "SPONTANEOUS"], {
  errorMap: () => ({ message: "Invalid offer type" }),
});

export const StatusOfferEnum = z.enum(
  ["PENDING", "ACCEPTED", "INTERVIEW", "REJECTED"],
  {
    errorMap: () => ({ message: "Invalid offer status" }),
  }
);

export const OfferCreateSchema = z.object({
  title: z.string().nullable(),
  type: TypeOfferEnum,
  company: z.string().min(1, "The company name is required"),
  url: z.string().url("Invalid URL"),
  isArchived: z.boolean().default(false),
  isFavorite: z.boolean().default(false),
  description: z.string().nullable(),
  applyDate: z.string().datetime("Invalid date"),
  location: z.string().min(1, "The location is required"),
  status: StatusOfferEnum,
  userId: z.string().uuid("Invalid user ID").nonempty("User ID is required"),
});

export type OfferCreateType = z.infer<typeof OfferCreateSchema>;
