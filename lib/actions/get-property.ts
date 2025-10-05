import { promises as fs } from "fs";
import path from "path";
import { propertySchema, Property } from "@/lib/types/property";

export async function getProperty(slug: string): Promise<Property | null> {
  try {
    const decodedSlug = decodeURIComponent(slug);

    const filePath = path.join(process.cwd(), "lib", "data", "properties.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const properties = JSON.parse(fileContents);

    const property = properties.find(
      (p: Property) => p.listingName === decodedSlug
    );

    if (!property) {
      return null;
    }

    // Validate the property data
    return propertySchema.parse(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    return null;
  }
}
