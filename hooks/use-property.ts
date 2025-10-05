import { useEffect, useState } from "react";
import { Property } from "@/lib/types/property";

export function useProperty(slug: string) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/properties/${slug}`);

        if (!response.ok) {
          throw new Error("Failed to fetch property");
        }

        const data = await response.json();

        if (data.success) {
          setProperty(data.property);
        } else {
          throw new Error(data.error || "Failed to load property");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load property"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [slug]);

  return { property, loading, error };
}
