import { NextRequest, NextResponse } from "next/server";

interface GoogleReview {
  author_name: string;
  author_url?: string;
  language: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

export interface GooglePlacesResponse {
  result: {
    name: string;
    rating: number;
    user_ratings_total: number;
    reviews: GoogleReview[];
  };
  status: string;
}

interface NormalizedGoogleReview {
  id: string;
  type: "guest-review";
  source: "google";
  status: "published";
  rating: number;
  publicReview: string;
  reviewCategory: Array<{
    category: string;
    rating: number;
  }>;
  submittedAt: string;
  guestName: string;
  listingName: string;
  authorPhoto?: string;
  authorUrl?: string;
  relativeTime: string;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const placeId = searchParams.get("placeId");
  const listingName = searchParams.get("listingName");

  if (!placeId) {
    return NextResponse.json(
      { status: "error", message: "Place ID is required" },
      { status: 400 }
    );
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { status: "error", message: "Google Places API key not configured" },
      { status: 500 }
    );
  }

  try {
    // Fetch place details with reviews
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch from Google Places API");
    }

    const data: GooglePlacesResponse = await response.json();

    if (data.status !== "OK") {
      return NextResponse.json(
        { status: "error", message: `Google API error: ${data.status}` },
        { status: 400 }
      );
    }

    // Normalize Google reviews to match Hostaway format
    const normalizedReviews: NormalizedGoogleReview[] = data.result.reviews.map(
      (review, index) => ({
        id: `google-${placeId}-${review.time}-${index}`,
        type: "guest-review",
        source: "google",
        status: "published",
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
        listingName: listingName || data.result.name,
        authorPhoto: review.profile_photo_url,
        authorUrl: review.author_url,
        relativeTime: review.relative_time_description,
      })
    );

    return NextResponse.json({
      status: "success",
      result: normalizedReviews,
      metadata: {
        placeName: data.result.name,
        averageRating: data.result.rating,
        totalReviews: data.result.user_ratings_total,
        source: "google-places",
      },
    });
  } catch (error) {
    console.error("Error fetching Google reviews:", error);
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
