import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { Review } from "@/lib/types/schema";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const encodedListingName = searchParams.get("listingName");

    let listingName: string | null = null;
    if (encodedListingName) {
      listingName = decodeURIComponent(encodedListingName);
    }

    const filePath = path.join(process.cwd(), "lib/data/reviews.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const reviews = JSON.parse(fileContents);

    // Filter for approved reviews only
    let filteredReviews = reviews.filter(
      (review: Review) => review.isApprovedForPublicDisplay === true
    );

    // If listingName is provided, filter by property
    if (listingName) {
      const normalizedListingName = listingName.toLowerCase().trim();
      filteredReviews = filteredReviews.filter((review: Review) =>
        review.listingName.toLowerCase().includes(normalizedListingName)
      );
    }

    // Sort by date (most recent first)
    filteredReviews.sort((a: Review, b: Review) => {
      return (
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      );
    });

    // Calculate statistics
    const stats = {
      totalReviews: filteredReviews.length,
      averageRating: 0,
      channelBreakdown: {} as Record<string, number>,
    };

    if (filteredReviews.length > 0) {
      const validRatings = filteredReviews.filter(
        (r: Review) => r.overallRating !== null
      );

      if (validRatings.length > 0) {
        const sum = validRatings.reduce(
          (acc: number, r: Review) => acc + (r.overallRating || 0),
          0
        );
        stats.averageRating = sum / validRatings.length;
      }

      // Count reviews by channel
      filteredReviews.forEach((review: Review) => {
        stats.channelBreakdown[review.channel] =
          (stats.channelBreakdown[review.channel] || 0) + 1;
      });
    }

    return NextResponse.json({
      success: true,
      reviews: filteredReviews,
      stats,
    });
  } catch (error) {
    console.error("Error fetching approved reviews:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch approved reviews",
      },
      { status: 500 }
    );
  }
}
