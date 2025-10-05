import fs from "fs";
import path from "path";
import { faker } from "@faker-js/faker";

import {
  channels,
  reviewTypes,
  reviewCategories,
  mockListingNames,
} from "./data";
import { Review } from "../types/schema";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to generate a random number of categories and ratings
const generateCategoryBreakdown = () => {
  const numCategories = faker.number.int({ min: 2, max: 4 });
  const categories = faker.helpers.arrayElements(
    reviewCategories,
    numCategories
  );

  return categories.map((category) => ({
    category,
    rating: faker.number.int({ min: 5, max: 10 }),
  }));
};

// Helper function to calculate the 5-star rating based on 10-point categories
const calculateOverallRating = (
  breakdown: Review["categoryBreakdown"]
): number | null => {
  if (breakdown.length === 0) return null;

  const sumOfRatings = breakdown.reduce((sum, item) => sum + item.rating, 0);
  const average10Point = sumOfRatings / breakdown.length;

  // Convert to 5-star scale and round to one decimal place
  return parseFloat(((average10Point / 10) * 5).toFixed(1));
};

const reviews: Review[] = Array.from({ length: 150 }, (_, index) => {
  // Determine if this is a low-rating review (simulate issues needing attention)
  const isLowRating = faker.helpers.arrayElement([true, false, false, false]);

  const categoryBreakdown = generateCategoryBreakdown();
  let overallRating = calculateOverallRating(categoryBreakdown);

  // If we decided it's a low rating, force the rating down
  if (isLowRating) {
    overallRating = faker.number.float({
      min: 1.5,
      max: 3.5,
      fractionDigits: 1,
    });
  }

  // Generate review text based on rating
  const publicReviewText = isLowRating
    ? faker.lorem.sentences(
        { min: 2, max: 4 },
        "The worst part was X. Needs improvement in Y."
      )
    : faker.lorem.sentences(
        { min: 2, max: 4 },
        "Fantastic stay! Everything was perfect and Z."
      );

  return {
    id: index + 1,
    listingName: faker.helpers.arrayElement(mockListingNames),
    guestName: faker.person.fullName(),
    publicReviewText: publicReviewText,
    overallRating: overallRating,
    channel: faker.helpers.arrayElement(channels).value as Review["channel"],
    reviewType: faker.helpers.arrayElement(reviewTypes)
      .value as Review["reviewType"],
    submittedAt: faker.date.recent({ days: 120 }).toISOString(),

    isApprovedForPublicDisplay: faker.datatype.boolean({ probability: 0.2 }),

    categoryBreakdown: categoryBreakdown,
  } as Review;
});

fs.writeFileSync(
  path.join(__dirname, "reviews.json"),
  JSON.stringify(reviews, null, 2)
);

console.log(`✅ ${reviews.length} Review data records generated.`);
