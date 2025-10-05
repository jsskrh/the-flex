export interface PropertyPlace {
  listingId: string;
  listingName: string;
  placeId: string;
  address: string;
}

// Map your Hostaway listing IDs to Google Place IDs
export const propertyPlaces: PropertyPlace[] = [
  {
    listingId: "23248",
    listingName: "Studio - Richmond Park Lodge",
    placeId: "ChIJYeklroIddkgRectThuo_Cp4",
    address: "Hyde Park, London",
  },
  {
    listingId: "355742",
    listingName: "Family House - Kensington Gardens",
    placeId: "ChIJYeklroIddkgRectThuo_Cp4",
    address: "Shoreditch, London",
  },
  {
    listingId: "23248",
    listingName: "3D N7 B - Islington Commons",
    placeId: "ChIJYeklroIddkgRectThuo_Cp4",
    address: "Hyde Park, London",
  },
  {
    listingId: "355742",
    listingName: "Penthouse - Canary Wharf View",
    placeId: "ChIJYeklroIddkgRectThuo_Cp4",
    address: "Shoreditch, London",
  },
  {
    listingId: "355742",
    listingName: "2B N1 A - Shoreditch Heights",
    placeId: "ChIJYeklroIddkgRectThuo_Cp4",
    address: "Shoreditch, London",
  },
];

export function getPlaceIdByListingId(listingId: string): string | null {
  const property = propertyPlaces.find((p) => p.listingId === listingId);
  return property?.placeId || null;
}

export function getPlaceIdByListingName(listingName: string): string | null {
  const property = propertyPlaces.find((p) => p.listingName === listingName);
  return property?.placeId || null;
}

// Helper to find Place ID using Google Places API
export async function findPlaceId(
  propertyName: string,
  address: string,
  apiKey: string
): Promise<string | null> {
  try {
    const query = `${propertyName} ${address}`;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
        query
      )}&inputtype=textquery&fields=place_id,name,formatted_address&key=${apiKey}`
    );

    const data = await response.json();

    if (data.status === "OK" && data.candidates.length > 0) {
      return data.candidates[0].place_id;
    }

    return null;
  } catch (error) {
    console.error("Error finding place ID:", error);
    return null;
  }
}
