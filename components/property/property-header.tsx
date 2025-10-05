import { Bath, Bed, House, Users } from "lucide-react";

interface HeaderProps {
  listingName: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
}

const PropertyHeader = ({
  listingName,
  bedrooms,
  bathrooms,
  maxGuests,
}: HeaderProps) => {
  return (
    <div className="hidden md:block">
      <h1 className="text-3xl font-bold mb-6 text-[#333333]">{listingName}</h1>
      <div className="flex items-center gap-8 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-2 text-[#5C5C5A]">
          <div className="p-2 rounded-full">
            <Users />
          </div>
          <div className="text-sm text-center">
            <span className="font-medium text-[#333333]">{maxGuests}</span>
            <span className="block">Guests</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[#5C5C5A]">
          <div className="p-2 rounded-full">
            <Bed />
          </div>
          <div className="text-sm text-center">
            <span className="font-medium text-[#333333]">{bedrooms}</span>
            <span className="block">Bedrooms</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[#5C5C5A]">
          <div className="p-2 rounded-full">
            <Bath />
          </div>
          <div className="text-sm text-center">
            <span className="font-medium text-[#333333]">{bathrooms}</span>
            <span className="block">Bathrooms</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[#5C5C5A]">
          <div className="p-2 rounded-full">
            <House />
          </div>
          <div className="text-sm text-center">
            <span className="font-medium text-[#333333]">{bedrooms}</span>
            <span className="block">Beds</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyHeader;
