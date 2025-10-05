"use client";

import {
  CalendarCheck,
  CalendarIcon,
  MessageCircle,
  Shield,
  Users,
} from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";
import { Calendar } from "../ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DateRange } from "react-day-picker";

const Booker = () => {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [guests, setGuests] = useState("1");

  const handleDateSelect = (range: DateRange | undefined) => {
    setStartDate(range?.from);
    setEndDate(range?.to);
  };

  return (
    <div className="sticky top-24 pt-2">
      <div className="text-card-foreground overflow-hidden bg-white dark:bg-gray-800 border-0 shadow-lg rounded-2xl">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[#284E4C]"></div>
          <div className="relative p-6">
            <h3 className="text-lg font-semibold text-[#FFFFFF] mb-1">
              Book Your Stay
            </h3>
            <p className="text-sm text-[#D2DADA]">Select dates to see prices</p>
          </div>
        </div>
        <div className="p-6 pt-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="inline-flex items-center whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-input px-4 py-2 w-full justify-start text-left font-normal bg-[rgb(241,243,238)] border-0 shadow-none transition-colors rounded-r-none h-10.5 group hover:bg-transparent hover:text-current text-muted-foreground"
                  >
                    <CalendarIcon />
                    {startDate
                      ? startDate.toLocaleDateString()
                      : "Select date"}{" "}
                    {endDate ? `- ${endDate.toLocaleDateString()}` : ""}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="range"
                    selected={{ from: startDate, to: endDate }}
                    onSelect={handleDateSelect}
                    disabled={(date) =>
                      date.getTime() < new Date().setHours(0, 0, 0, 0)
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="w-[120px]">
              <Select onValueChange={setGuests} value={guests} defaultValue="1">
                <SelectTrigger
                  id="date"
                  className="inline-flex items-center whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-input px-4 py-2 w-full justify-start text-left font-normal bg-[rgb(241,243,238)] border-0 shadow-none transition-colors rounded-l-none !h-10.5 group hover:bg-transparent hover:text-current text-muted-foreground"
                >
                  <Users />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-3 pt-6">
            <Button
              className="bg-[#284E4C] hover:bg-[#284E4C]/90 w-full text-white shadow-lg disabled:pointer-events-none disabled:opacity-50 h-12 rounded-md px-8"
              disabled
            >
              <CalendarCheck className="size-3" />
              Check availability
            </Button>
            <Button
              className="shadow-sm h-12 rounded-md px-8 w-full border-[#284E4C]/20 text-[#284E4C] hover:bg-[#284E4C]/5 hover:border-[#284E4C]/30"
              variant="outline"
            >
              <MessageCircle className="size-3" />
              Send enquiry
            </Button>
          </div>
          <p className="text-sm text-[#5C5C5A] text-center mt-4">
            <span className="inline-flex items-center gap-1">
              <Shield className="size-3" /> Instant booking confirmation
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Booker;
