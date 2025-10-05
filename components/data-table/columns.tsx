"use client";

import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

import { Checkbox } from "@/components/ui/checkbox";

import { channels } from "@/lib/data/data";
import { Review } from "@/lib/types/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { StarRating } from "../dashboard/star-rating";
import { toast } from "sonner";
import { useState } from "react";
import { House } from "lucide-react";
import Link from "next/link";

export const getColumns = (onRefresh?: () => void): ColumnDef<Review>[] => [
  {
    id: "publicDisplay",
    header: ({ table }) => {
      const allRows = table.getRowModel().rows;
      const approvedCount = allRows.filter(
        (row) => row.original.isApprovedForPublicDisplay
      ).length;
      const isAllApproved =
        approvedCount === allRows.length && allRows.length > 0;
      const isSomeApproved =
        approvedCount > 0 && approvedCount < allRows.length;

      const handleToggleAll = async () => {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const accountId = process.env.NEXT_PUBLIC_ACCOUNT_ID;

        if (!apiKey || !accountId) {
          console.error(
            "API Key or Account ID is missing from environment variables."
          );
          toast.error("Configuration error: Missing API credentials.");
          return;
        }

        const newValue = !isAllApproved;
        const updatePromises = allRows.map((row) =>
          fetch(`/api/reviews/${row.original.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": apiKey,
              "x-account-id": accountId,
            },
            body: JSON.stringify({ isApprovedForPublicDisplay: newValue }),
          })
        );

        try {
          await Promise.all(updatePromises);
          toast.success(
            newValue
              ? "Review approved for public display"
              : "Review removed from public display"
          );
        } catch (error) {
          console.error("Error updating reviews:", error);
        }
      };

      return (
        <Checkbox
          checked={
            isAllApproved ? true : isSomeApproved ? "indeterminate" : false
          }
          onCheckedChange={handleToggleAll}
          aria-label="Toggle all for public display"
          className="translate-y-[2px]"
        />
      );
    },
    cell: ({ row }) => {
      const [isApproved, setIsApproved] = useState(
        row.original.isApprovedForPublicDisplay
      );

      const handleToggle = async (value: boolean) => {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const accountId = process.env.NEXT_PUBLIC_ACCOUNT_ID;

        if (!apiKey || !accountId) {
          console.error(
            "API Key or Account ID is missing from environment variables."
          );
          toast.error("Configuration error: Missing API credentials.");
          return;
        }

        setIsApproved(value);

        try {
          const response = await fetch(`/api/reviews/${row.original.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": apiKey,
              "x-account-id": accountId,
            },
            body: JSON.stringify({ isApprovedForPublicDisplay: value }),
          });

          if (response.ok) {
            toast.success(
              !isApproved
                ? "Review approved for public display"
                : "Review removed from public display"
            );
          }
        } catch (error) {
          setIsApproved(!value);
          console.error("Error updating review:", error);
        }
      };

      return (
        // <Checkbox
        //   checked={isApproved}
        //   onCheckedChange={handleToggle}
        //   aria-label="Toggle public display"
        //   className="translate-y-[2px]"
        // />
        <div className="w-[50px] flex flex-col">
          <House
            onClick={() => handleToggle(!isApproved)}
            className={`cursor-pointer ${
              isApproved
                ? "text-white fill-green-700"
                : "text-green-700 fill-neutral-400"
            }`}
          />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "listingName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property & Guest" />
    ),
    cell: ({ row }) => (
      <div className="w-[240px] flex flex-col">
        <Link
          href={`/properties/${encodeURIComponent(
            row.getValue("listingName")
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold hover:underline"
        >
          {row.getValue("listingName")}
        </Link>
        <span className="text-sm text-muted-foreground">
          by {row.original.guestName}
        </span>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "publicReviewText",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Review Excerpt" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("publicReviewText")}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "overallRating",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Overall Rating" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[150px] items-center gap-2">
          <StarRating rating={row.getValue("overallRating")} />
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "channel",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Channel" />
    ),
    cell: ({ row }) => {
      const channel = channels.find(
        (channel) => channel.value === row.getValue("channel")
      );

      if (!channel) {
        return null;
      }

      return (
        <div className="flex items-center gap-2">
          {channel.icon && (
            <channel.icon className="text-muted-foreground size-4" />
          )}
          <span className="capitalize">{row.getValue("channel")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "reviewType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Review Type" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <span>{row.getValue("reviewType")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "cleanliness",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cleanliness" />
    ),
    accessorFn: (row) => {
      const cleanliness = row.categoryBreakdown?.find(
        (category) => category.category === "cleanliness"
      );
      return cleanliness?.rating;
    },
    cell: ({ row }) => {
      const cleanliness = row.original.categoryBreakdown?.find(
        (category) => category.category === "cleanliness"
      );

      return (
        <div className="flex items-center gap-2">
          <span>{cleanliness?.rating ?? "-"}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const cleanliness = row.original.categoryBreakdown?.find(
        (category) => category.category === "cleanliness"
      );
      return value.includes(cleanliness?.rating);
    },
  },
  {
    id: "communication",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Communication" />
    ),
    accessorFn: (row) => {
      const communication = row.categoryBreakdown?.find(
        (category) => category.category === "communication"
      );
      return communication?.rating;
    },
    cell: ({ row }) => {
      const communication = row.original.categoryBreakdown?.find(
        (category) => category.category === "communication"
      );

      return (
        <div className="flex items-center gap-2">
          <span>{communication?.rating ?? "-"}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const communication = row.original.categoryBreakdown?.find(
        (category) => category.category === "communication"
      );
      return value.includes(communication?.rating);
    },
  },
  {
    id: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    accessorFn: (row) => {
      const location = row.categoryBreakdown?.find(
        (category) => category.category === "location"
      );
      return location?.rating;
    },
    cell: ({ row }) => {
      const location = row.original.categoryBreakdown?.find(
        (category) => category.category === "location"
      );

      return (
        <div className="flex items-center gap-2">
          <span>{location?.rating ?? "-"}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const location = row.original.categoryBreakdown?.find(
        (category) => category.category === "location"
      );
      return value.includes(location?.rating);
    },
  },
  {
    id: "value",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Value" />
    ),
    accessorFn: (row) => {
      const value = row.categoryBreakdown?.find(
        (category) => category.category === "value"
      );
      return value?.rating;
    },
    cell: ({ row }) => {
      const value = row.original.categoryBreakdown?.find(
        (category) => category.category === "value"
      );

      return (
        <div className="flex items-center gap-2">
          <span>{value?.rating ?? "-"}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const data = row.original.categoryBreakdown?.find(
        (category) => category.category === "location"
      );
      return value.includes(data?.rating);
    },
  },
  {
    id: "check_in",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Check In" />
    ),
    accessorFn: (row) => {
      const check_in = row.categoryBreakdown?.find(
        (category) => category.category === "check_in"
      );
      return check_in?.rating;
    },
    cell: ({ row }) => {
      const check_in = row.original.categoryBreakdown?.find(
        (category) => category.category === "check_in"
      );

      return (
        <div className="flex items-center gap-2">
          <span>{check_in?.rating ?? "-"}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const check_in = row.original.categoryBreakdown?.find(
        (category) => category.category === "check_in"
      );
      return value.includes(check_in?.rating);
    },
  },
  {
    id: "respect_house_rules",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Respect House Rules" />
    ),
    accessorFn: (row) => {
      const respect_house_rules = row.categoryBreakdown?.find(
        (category) => category.category === "respect_house_rules"
      );
      return respect_house_rules?.rating;
    },
    cell: ({ row }) => {
      const respect_house_rules = row.original.categoryBreakdown?.find(
        (category) => category.category === "respect_house_rules"
      );

      return (
        <div className="flex items-center gap-2">
          <span>{respect_house_rules?.rating ?? "-"}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const respect_house_rules = row.original.categoryBreakdown?.find(
        (category) => category.category === "respect_house_rules"
      );
      return value.includes(respect_house_rules?.rating);
    },
  },
  {
    accessorKey: "submittedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Submitted At" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <span>{moment(row.getValue("submittedAt")).format("lll")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
