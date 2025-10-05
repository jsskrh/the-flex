"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Sofa,
  Wifi,
  type LucideIcon,
  Network,
  ShieldCheck,
  UtensilsCrossed,
  WashingMachine,
  ArrowUpDown,
  Wind,
  Thermometer,
  HandPlatter,
  Heater,
  Microwave,
  Book,
  Tv,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { AmenityCategory } from "@/lib/data/data";

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const IconMap: { [key: string]: LucideIcon } = {
  Sofa,
  Wifi,
  Network,
  ShieldCheck,
  Wind,
  Thermometer,
  UtensilsCrossed,
  ArrowUpDown,
  WashingMachine,
  HandPlatter,
  Microwave,
  Heater,
  Book,
  Tv,
};

const DynamicIcon = ({
  iconName,
  size = 4,
}: {
  iconName: string;
  size?: number;
}) => {
  const Icon = IconMap[iconName];
  if (!Icon) return null;
  return <Icon className={`size-${size}`} />;
};

interface AmenitiesProps {
  amenities: AmenityCategory[];
}

const Amenities = ({ amenities }: AmenitiesProps) => {
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  const allAmenities = useMemo(() => {
    return amenities.flatMap((category) =>
      category.items.map((item) => ({
        name: item.name,
        icon: item.icon,
        category: category.category,
      }))
    );
  }, []);

  const [shownAmenities, setShownAmenities] = useState(() => {
    if (allAmenities.length <= 9) {
      return allAmenities;
    }
    return allAmenities.slice(0, 9);
  });

  useEffect(() => {
    if (allAmenities.length > 9) {
      const shuffled = shuffleArray(allAmenities).slice(0, 9);
      setShownAmenities(shuffled);
    }
  }, [allAmenities]);

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-2xl">Amenities</CardTitle>
        <Dialog open={showAllAmenities} onOpenChange={setShowAllAmenities}>
          <DialogTrigger asChild>
            <Button className="underline" variant="ghost">
              View all amenities
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl max-h-[80vh] overflow-y-auto bg-alpha">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                All Amenities
              </DialogTitle>
              <DialogDescription>
                A comprehensive list of all amenities provided.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 mt-4">
              {amenities.map((category) => (
                <div key={category.category}>
                  <h3 className="text-lg font-semibold mb-3 border-b pb-1">
                    {category.category}
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-[#5C5C5A]">
                    {category.items.map((item) => (
                      <div key={item.name} className="flex items-center gap-3">
                        <div className="p-2 rounded-full">
                          <DynamicIcon iconName={item.icon} size={5} />
                        </div>
                        <span className="capitalize text-sm">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-[#5C5C5A]">
        {shownAmenities.map((amenity) => (
          <div className="flex items-center gap-3" key={amenity.name}>
            <div className="p-2 rounded-full">
              <DynamicIcon iconName={amenity.icon} size={4} />
            </div>
            <span className="capitalize">{amenity.name}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Amenities;
