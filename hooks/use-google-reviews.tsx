import { useState, useEffect } from "react";

interface GoogleReview {
  id: string;
  type: string;
  source: string;
  status: string;
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

interface UseGoogleReviewsReturn {
  reviews: GoogleReview[];
  loading: boolean;
  error: string | null;
  metadata: {
    placeName?: string;
    averageRating?: number;
    totalReviews?: number;
  };
  refetch: () => void;
}

export function useGoogleReviews(
  placeId: string | null,
  listingName?: string
): UseGoogleReviewsReturn {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState({});

  const fetchReviews = async () => {
    if (!placeId) {
      setError("No place ID provided");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({ placeId });
      if (listingName) {
        params.append("listingName", listingName);
      }

      const response = await fetch(`/api/reviews/google?${params.toString()}`);
      const data = await response.json();

      if (data.status === "success") {
        setReviews(data.result);
        setMetadata(data.metadata || {});
      } else {
        setError(data.message || "Failed to fetch reviews");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [placeId, listingName]);

  return {
    reviews,
    loading,
    error,
    metadata,
    refetch: fetchReviews,
  };
}

export function useBatchGoogleReviews(
  properties: Array<{ placeId: string; listingName: string }>
) {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async () => {
    if (!properties || properties.length === 0) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/reviews/google/batch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ properties }),
      });

      const data = await response.json();

      if (data.status === "success") {
        setResults(data.result);
      } else {
        setError(data.message || "Failed to fetch reviews");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [JSON.stringify(properties)]);

  return {
    results,
    loading,
    error,
    refetch: fetchReviews,
  };
}
