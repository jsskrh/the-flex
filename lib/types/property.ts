import { z } from "zod";

export const propertySchema = z.object({
  id: z.string(),
  listingName: z.string(),
  placeId: z.string(),
  address: z.string(),
  description: z.string(),
  bedrooms: z.number(),
  bathrooms: z.number(),
  maxGuests: z.number(),
  pricePerNight: z.number(),
  images: z.array(z.string()),
  amenities: z.array(
    z.object({
      category: z.string(),
      items: z.array(
        z.object({
          name: z.string(),
          icon: z.string(),
        })
      ),
    })
  ),
  policies: z.object({
    checkTimes: z.object({
      checkInTime: z.string(),
      checkOutTime: z.string(),
    }),
    houseRules: z.array(
      z.object({
        name: z.string(),
        icon: z.string(),
      })
    ),
    cancellationPolicies: z.array(
      z.object({
        duration: z.string(),
        rules: z.array(
          z.object({
            condition: z.string(),
            details: z.string(),
          })
        ),
      })
    ),
  }),
});

export type Property = z.infer<typeof propertySchema>;
