import { NextRequest, NextResponse } from "next/server";
import { GooglePlacesResponse } from "../route";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { properties } = body;

  if (!properties || !Array.isArray(properties)) {
    return NextResponse.json(
      { status: "error", message: "Properties array is required" },
      { status: 400 }
    );
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { status: "error", message: "Google Places API key not configured" },
      { status: 500 }
    );
  }

  try {
    const allReviews = await Promise.all(
      properties.map(
        async (property: { placeId: string; listingName: string }) => {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${property.placeId}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}`
          );

          const data: GooglePlacesResponse = await response.json();

          if (data.status !== "OK") {
            return {
              listingName: property.listingName,
              reviews: [],
              error: data.status,
            };
          }

          const normalizedReviews = data.result.reviews.map(
            (review, index) => ({
              id: `google-${property.placeId}-${review.time}-${index}`,
              type: "guest-review" as const,
              source: "google" as const,
              status: "published" as const,
              rating: review.rating,
              publicReview: review.text,
              reviewCategory: [
                {
                  category: "overall",
                  rating: review.rating,
                },
              ],
              submittedAt: new Date(review.time * 1000).toISOString(),
              guestName: review.author_name,
              listingName: property.listingName,
              authorPhoto: review.profile_photo_url,
              authorUrl: review.author_url,
              relativeTime: review.relative_time_description,
            })
          );

          return {
            listingName: property.listingName,
            placeId: property.placeId,
            reviews: normalizedReviews,
            metadata: {
              averageRating: data.result.rating,
              totalReviews: data.result.user_ratings_total,
            },
          };
        }
      )
    );

    return NextResponse.json({
      status: "success",
      result: allReviews,
    });
  } catch (error) {
    console.error("Error fetching batch Google reviews:", error);
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
