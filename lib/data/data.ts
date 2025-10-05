import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Briefcase,
  CheckCircle,
  Circle,
  CircleOff,
  Clock,
  HelpCircle,
  Home,
  MessageCircle,
  ThumbsUp,
  Timer,
  XCircle,
  PawPrint,
  PartyPopper,
  Shield,
  type LucideIcon,
} from "lucide-react";

interface LookupItem {
  value: string;
  label: string;
  icon?: LucideIcon;
}

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: HelpCircle,
  },
  {
    value: "todo",
    label: "Todo",
    icon: Circle,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: Timer,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircle,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CircleOff,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDown,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRight,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUp,
  },
];

export const channels: LookupItem[] = [
  {
    value: "hostaway",
    label: "Hostaway (Aggregated)",
    icon: Home,
  },
  {
    value: "booking",
    label: "Booking.com",
    icon: Briefcase,
  },
  {
    value: "airbnb",
    label: "Airbnb",
    icon: Home,
  },
  {
    value: "google",
    label: "Google Reviews",
    icon: MessageCircle,
  },
];

export const reviewTypes: LookupItem[] = [
  {
    value: "guest-to-host",
    label: "Guest Review (Public)",
  },
  {
    value: "host-to-guest",
    label: "Host Review (Internal)",
  },
];

export const approvalStatuses: LookupItem[] = [
  {
    value: "approved",
    label: "Approved for Public Display",
    icon: ThumbsUp,
  },
  {
    value: "pending",
    label: "Pending Review",
    icon: Clock,
  },
  {
    value: "rejected",
    label: "Rejected/Internal Only",
    icon: XCircle,
  },
];

export const reviewCategories: string[] = [
  "cleanliness",
  "communication",
  "respect_house_rules",
  "value",
  "check_in",
  "location",
];

export const mockListingNames: string[] = [
  "2B N1 A - Shoreditch Heights",
  "Penthouse - Canary Wharf View",
  "3D N7 B - Islington Commons",
  "Studio - Richmond Park Lodge",
  "Family House - Kensington Gardens",
];

export interface AmenityItem {
  name: string;
  icon: string;
}

export interface AmenityCategory {
  category: string;
  items: AmenityItem[];
}

export const amenities: AmenityCategory[] = [
  {
    category: "Living room",
    items: [
      { name: "Cable TV", icon: "Tv" },
      { name: "Private Living Room", icon: "Sofa" },
    ],
  },
  {
    category: "Internet & office",
    items: [
      { name: "Internet", icon: "Network" },
      { name: "Wireless", icon: "Wifi" },
      { name: "Free WiFi", icon: "Wifi" },
    ],
  },
  {
    category: "Kitchen",
    items: [
      { name: "Toaster", icon: "Microwave" },
      { name: "Microwave", icon: "Microwave" },
      { name: "Electric Kettle", icon: "Heater" },
      { name: "Stove", icon: "Heater" },
      { name: "Kitchen Utensils", icon: "UtensilsCrossed" },
      { name: "Cooking Basics", icon: "Book" },
      { name: "Dining Area", icon: "HandPlatter" },
      { name: "Dining Table", icon: "Table" },
    ],
  },
  {
    category: "Others",
    items: [
      { name: "Smoke Detector", icon: "ShieldCheck" },
      { name: "Elevator", icon: "ArrowUpDown" },
      { name: "Heating", icon: "Thermometer" },
      { name: "Washing Machine", icon: "WashingMachine" },
      { name: "Hair Dryer", icon: "Wind" },
    ],
  },
];

export interface HouseRuleItem {
  name: string;
  icon: string;
}

export interface CheckTimes {
  checkInTime: string;
  checkOutTime: string;
}

export interface CancellationPolicy {
  duration: string;
  rules: {
    condition: string;
    details: string;
  }[];
}

export interface PoliciesData {
  checkTimes: CheckTimes;
  houseRules: HouseRuleItem[];
  cancellationPolicies: CancellationPolicy[];
}

export const HouseRuleIconMap: { [key: string]: LucideIcon } = {
  CircleOff,
  PawPrint,
  PartyPopper,
  Shield,
};

export const policiesData: PoliciesData = {
  checkTimes: {
    checkInTime: "3:00 PM",
    checkOutTime: "10:00 AM",
  },

  houseRules: [
    { name: "No smoking", icon: "CircleOff" },
    { name: "No pets", icon: "PawPrint" },
    { name: "No parties or events", icon: "PartyPopper" },
    { name: "Security deposit required", icon: "Shield" },
  ],

  cancellationPolicies: [
    {
      duration: "For stays less than 28 days",
      rules: [
        {
          condition: "Full refund",
          details: "up to 14 days before check-in",
        },
        {
          condition: "No refund",
          details: "for bookings less than 14 days before check-in",
        },
      ],
    },
    {
      duration: "For stays of 28 days or more",
      rules: [
        {
          condition: "Full refund",
          details: "up to 30 days before check-in",
        },
        {
          condition: "No refund",
          details: "for bookings less than 30 days before check-in",
        },
      ],
    },
  ],
};

interface NavItem {
  name: string;
  path: string;
}

export const navData: NavItem[] = [
  { name: "Landlords", path: "#" },
  { name: "About us", path: "#" },
  { name: "Careers", path: "#" },
  { name: "Contact", path: "#" },
];
