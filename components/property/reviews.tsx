"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Loader2, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CategoryBreakdown {
  category: string;
  rating: number;
}

interface Review {
  id: number;
  listingName: string;
  guestName: string;
  publicReviewText: string;
  overallRating: number | null;
  channel: "hostaway" | "booking" | "airbnb" | "google";
  reviewType: "guest-to-host" | "host-to-guest";
  submittedAt: string;
  isApprovedForPublicDisplay: boolean;
  categoryBreakdown: CategoryBreakdown[];
}

interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  channelBreakdown: Record<string, number>;
}

interface ReviewsProps {
  propertySlug: string;
}

const Reviews = ({ propertySlug }: ReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `/api/reviews/approved?listingName=${encodeURIComponent(
            propertySlug
          )}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }

        const data = await response.json();

        if (data.success) {
          setReviews(data.reviews);
          setStats(data.stats);
        } else {
          throw new Error(data.error || "Failed to load reviews");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [propertySlug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getChannelBadgeColor = (channel: string) => {
    const colors = {
      hostaway: "bg-blue-100 text-blue-700",
      booking: "bg-purple-100 text-purple-700",
      airbnb: "bg-pink-100 text-pink-700",
      google: "bg-green-100 text-green-700",
    };
    return (
      colors[channel as keyof typeof colors] || "bg-gray-100 text-gray-700"
    );
  };

  const renderStars = (rating: number | null) => {
    if (!rating) return null;

    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.round(rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-1 text-sm font-medium text-gray-700">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);
  const hasMore = reviews.length > 3;

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
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
        <CardHeader>
          <CardTitle className="text-2xl">Guest Reviews</CardTitle>
        </CardHeader>
        <CardContent className="py-8">
          <p className="text-gray-500 text-center">
            No reviews available for this property yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">Guest Reviews</CardTitle>
          <div className="flex items-center gap-2 text-sm font-normal">
            {stats?.averageRating.toFixed(1) || "0.0"}{" "}
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />{" "}
            <span className="underline">
              ({stats?.totalReviews || 0}{" "}
              {stats?.totalReviews === 1 ? "review" : "reviews"})
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {displayedReviews.map((review) => (
          <div
            key={review.id}
            className="border-b pb-6 last:border-b-0 last:pb-0"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {review.guestName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(review.submittedAt)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {renderStars(review.overallRating)}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getChannelBadgeColor(
                        review.channel
                      )}`}
                    >
                      {review.channel}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  {review.publicReviewText}
                </p>
                {review.categoryBreakdown.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-3">
                    {review.categoryBreakdown.slice(0, 3).map((category) => (
                      <div
                        key={category.category}
                        className="flex items-center gap-2 text-xs"
                      >
                        <span className="text-gray-600 capitalize">
                          {category.category.replace(/_/g, " ")}
                        </span>
                        <span className="font-semibold text-gray-900">
                          {category.rating}/10
                        </span>
                      </div>
                    ))}
                  </div>
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

export default Reviews;
