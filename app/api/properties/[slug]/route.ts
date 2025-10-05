import { Property, propertySchema } from "@/lib/types/property";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const filePath = path.join(process.cwd(), "lib", "data", "properties.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const properties: Property[] = JSON.parse(fileContents);

    const property = properties.find(
      (p: Property) => p.listingName === decodeURIComponent(slug)
    );

    if (!property) {
      return NextResponse.json(
        { success: false, error: "Property not found" },
        { status: 404 }
      );
    }

    const validatedProperty = propertySchema.parse(property);

    return NextResponse.json({
      success: true,
      property: validatedProperty,
    });
  } catch (error) {
    console.error("Error fetching property:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch property" },
      { status: 500 }
    );
  }
}
