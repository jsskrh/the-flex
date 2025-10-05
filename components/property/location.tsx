"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LocationProps {
  placeId: string;
  propertyName: string;
}

const Location = ({ placeId, propertyName }: LocationProps) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || "";

  const mapEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=place_id:${placeId}&zoom=15`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          Location
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative w-full h-[300px] rounded-lg overflow-hidden border">
          {apiKey ? (
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={mapEmbedUrl}
              title={`Map showing ${propertyName}`}
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <p className="text-gray-500 text-sm">
                Map unavailable - API key not configured
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Location;
