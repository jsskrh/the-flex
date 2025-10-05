import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "lib/data/reviews.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const reviews = JSON.parse(fileContents);

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error reading reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
