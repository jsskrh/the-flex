"use client";

import { useEffect, useState } from "react";
import { getColumns } from "../data-table/columns";
import { DataTable } from "../data-table/data-table";
import { SectionCards } from "./section-cards";

const DashboardContent = () => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const response = await fetch("/api/reviews");
      const data = await response.json();

      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const columns = getColumns(fetchReviews);

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards data={reviews} />
        <div className="px-4 lg:px-6">
          <DataTable data={reviews} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
