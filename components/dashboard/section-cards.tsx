"use client";

import KPICard from "./kpi-card";
import { useMemo } from "react";

export function SectionCards({ data }: any) {
  const { totalReviews, avgRating, approvalRate } = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) {
      return {
        totalReviews: 0,
        avgRating: 0,
        approvalRate: 0,
      };
    }

    const total = data.length;
    const approved = data.filter((r) => r.isApprovedForPublicDisplay).length;
    const sumRatings = data.reduce((sum, r) => sum + (r.overallRating || 0), 0);

    return {
      totalReviews: total,
      avgRating: total > 0 ? (sumRatings / total).toFixed(2) : 0,
      approvalRate: total > 0 ? ((approved / total) * 100).toFixed(0) : 0,
    };
  }, [data]);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <KPICard
        title="Overall Average Rating"
        value={avgRating}
        trend={4.5}
        footnote="Ratings on a 5 star scale"
      />
      <KPICard
        title="Total Reviews"
        value={totalReviews}
        trend={4.5}
        footnote="Reviews for the last 90 days"
      />
      <KPICard
        title="Public Approval Rate"
        value={approvalRate}
        trend={4.5}
        footnote="Ratings for the last 6 months"
      />
    </div>
  );
}
