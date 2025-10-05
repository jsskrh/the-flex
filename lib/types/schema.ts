import { z } from "zod";

export const reviewSchema = z.object({
  id: z.number().int(),
  listingName: z.string(),
  guestName: z.string(),
  publicReviewText: z.string(),
  overallRating: z.number().min(1).max(5).nullable(),
  channel: z.enum(["hostaway", "booking", "airbnb", "google"]),
  reviewType: z.enum(["guest-to-host", "host-to-guest"]),
  submittedAt: z.string(),
  isApprovedForPublicDisplay: z.boolean(),
  categoryBreakdown: z.array(
    z.object({
      category: z.string(),
      rating: z.number().int().min(1).max(10),
    })
  ),
});

export type Review = z.infer<typeof reviewSchema>;
