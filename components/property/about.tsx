"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const fullText = `This charming studio in Paddington is perfect for a cozy stay. The bedroom features a comfortable double bed, while the property also includes a bathroom and a fully equipped kitchen. 
  
This cozy studio property in Paddington offers great amenities for a comfortable stay. The bedroom is furnished with a plush double bed, ensuring a restful night's sleep. The property also features a well-equipped bathroom and a kitchen complete with all the basics you need for cooking. Perfect for those looking for a relaxing and convenient stay!

Situated in the heart of Paddington, this property offers an ideal location to explore one of Sydney's most vibrant neighborhoods. Known for its trendy cafes, boutique shopping, and lively atmosphere, Paddington is a haven for those who appreciate art, culture, and a lively urban vibe. Enjoy beautiful parks like Centennial Park, which is just a short walk away, or take a stroll down Oxford Street, lined with charming shops and eateries. The area also has easy access to public transport, making it simple to explore other parts of Sydney. Whether you're here for a weekend getaway or an extended stay, Paddington offers a perfect blend of convenience, style, and local charm.

Hayat Paddington - 5 minute walk
Harrison's Coffee - 5 minute walk
Leinster Terrace (Stop LF) - 9 minute walk`;

  const previewText = fullText.slice(0, 300) + "...";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">About this property</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-[#5C5C5A] whitespace-pre-line leading-relaxed">
            {isExpanded ? fullText : previewText}
          </p>
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            className="items-center justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 underline-offset-4 text-[#284E4C] hover:text-[#284E4C]/90 p-0 h-auto inline mt-2"
          >
            {isExpanded ? "Show less" : "Read more"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default About;
