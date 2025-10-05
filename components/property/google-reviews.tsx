"use client";
import { useState } from "react";
import { useGoogleReviews } from "@/hooks/use-google-reviews";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Loader2 } from "lucide-react";
import Image from "next/image";

interface GoogleReviewsProps {
  placeId: string;
  listingName: string;
}

const GoogleReviews = ({ placeId, listingName }: GoogleReviewsProps) => {
  const { reviews, loading, error, metadata } = useGoogleReviews(
    placeId,
    listingName
  );
  const [showAll, setShowAll] = useState(false);

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);
  const hasMore = reviews.length > 3;

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-red-500 text-center">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (reviews.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-gray-500 text-center">
            No Google reviews available
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-2xl">Google Reviews</span>
          {metadata.averageRating && (
            <div className="flex items-center gap-2 text-sm font-normal">
              {metadata.averageRating.toFixed(1)}{" "}
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />{" "}
              <span className="underline">
                ({metadata.totalReviews} reviews)
              </span>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {displayedReviews.map((review) => (
          <div key={review.id} className="border-b pb-6 last:border-b-0">
            <div className="flex items-start gap-4">
              {review.authorPhoto && (
                <Image
                  src={review.authorPhoto}
                  alt={review.guestName}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {review.guestName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {review.relativeTime}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {review.publicReview}
                </p>
                {review.authorUrl && (
                  <a
                    href={review.authorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline mt-2 inline-block"
                  >
                    View on Google
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}

        {hasMore && (
          <div className="pt-4 text-center">
            <Button
              onClick={() => setShowAll(!showAll)}
              variant="outline"
              className="w-full sm:w-auto"
            >
              {showAll ? "Show less" : `Show all ${reviews.length} reviews`}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GoogleReviews;
