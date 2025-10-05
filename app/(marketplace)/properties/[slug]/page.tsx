import About from "@/components/property/about";
import Amenities from "@/components/property/amenities";
import Booker from "@/components/property/booker";
import GoogleReviews from "@/components/property/google-reviews";
import ImageDisplay from "@/components/property/image-display";
import Policy from "@/components/property/policy";
import PropertyHeader from "@/components/property/property-header";
import Reviews from "@/components/property/reviews";
import Location from "@/components/property/location";
import { getProperty } from "@/lib/actions/get-property";
import { notFound } from "next/navigation";

interface PropertyProps {
  params: {
    slug: string;
  };
}

const Property = async (props: PropertyProps) => {
  const params = await props.params;
  const property = await getProperty(params.slug);

  if (!property) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-7xl px-3 md:px-4 space-y-8 md:space-y-12">
      <ImageDisplay />
      <PropertyHeader
        listingName={property.listingName}
        bedrooms={property.bedrooms}
        bathrooms={property.bathrooms}
        maxGuests={property.maxGuests}
      />
      <div className="grid lg:grid-cols-3 gap-8 pb-8 mb-20 md:mb-8">
        <div className="lg:col-span-2 space-y-8">
          <About />
          <Amenities amenities={property.amenities} />
          <Reviews propertySlug={params.slug} />
          <GoogleReviews
            placeId={property.placeId}
            listingName={property.listingName}
          />
          <Policy policies={property.policies} />
          <Location
            placeId={property.placeId}
            propertyName={property.listingName}
          />
        </div>
        <div>
          <Booker />
        </div>
      </div>
    </div>
  );
};

export default Property;
