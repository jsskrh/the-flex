import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authentication check
    const apiKey = req.headers.get("x-api-key");
    const accountId = req.headers.get("x-account-id");

    const expectedApiKey = process.env.NEXT_PUBLIC_API_KEY;
    const expectedAccountId = process.env.NEXT_PUBLIC_ACCOUNT_ID;

    if (!apiKey || !accountId) {
      return NextResponse.json(
        { error: "Missing authentication headers" },
        { status: 401 }
      );
    }

    if (apiKey !== expectedApiKey || accountId !== expectedAccountId) {
      return NextResponse.json(
        { error: "Invalid authentication credentials" },
        { status: 403 }
      );
    }

    // Proceed with the original logic
    const body = await req.json();
    const { isApprovedForPublicDisplay } = body;
    const reviewId = parseInt(params.id);

    const filePath = path.join(process.cwd(), "lib", "data", "reviews.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const reviews = JSON.parse(fileContents);

    const reviewIndex = reviews.findIndex((r: any) => r.id === reviewId);

    if (reviewIndex === -1) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    reviews[reviewIndex].isApprovedForPublicDisplay =
      isApprovedForPublicDisplay;

    await fs.writeFile(filePath, JSON.stringify(reviews, null, 2), "utf8");

    return NextResponse.json({
      success: true,
      review: reviews[reviewIndex],
    });
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json(
      { error: "Failed to update review" },
      { status: 500 }
    );
  }
}
