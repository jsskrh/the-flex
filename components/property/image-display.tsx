import Image from "next/image";
import ImageCarousel from "./image-carousel";

const propertyImages = [
  {
    url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/23248-355742-X-9maI4xpvQ8XaXT9XAKMMTbBRDQsoMC15tEbjvHut0-67b342ba0cbb4",
    alt: "Studio Flat near Hyde Park - The Flex London - Main 1",
  },
  {
    url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/23248-355742-F9wtlxAqU--XZd0oyTgxQ1uhnXVXs2m8obtDq5fwkehU-67b342cf6f43d",
    alt: "Studio Flat near Hyde Park - The Flex London - Main 2",
  },
  {
    url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/23248-355742-P0K1xqH9hJ4jfTO101083speWjUsjESvSKGLlBf0Blg-67b342db6a624",
    alt: "Studio Flat near Hyde Park - The Flex London - Main 3",
  },
  {
    url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/23248-355742-cxWXtid5JiTnbdWuuEna8tWdZu0RT1wYeW7zppyfmuw-67b342e5f403d",
    alt: "Studio Flat near Hyde Park - The Flex London - Main 4",
  },
  {
    url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/23248-355742-MRZ-EKaSCYhdjE611rFXEeF6D--2zL7tg4O8YHcWCHfo-67b342f7716f8",
    alt: "Studio Flat near Hyde Park - The Flex London - Main 5",
  },
];

const ImageDisplay = () => {
  return (
    <div className="relative mt-8">
      <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-4 h-[600px] [&>*:nth-child(1)]:col-span-2 [&>*:nth-child(1)]:row-span-2 [&>*:nth-child(1)_img,&>*:nth-child(1)_div]:rounded-l-xl [&>*:nth-child(3)_img,&>*:nth-child(3)_div]:rounded-tr-xl [&>*:nth-child(5)_img,&>*:nth-child(5)_div]:rounded-br-xl">
        {propertyImages.map((image) => (
          <div className="relative cursor-pointer group" key={image.url}>
            <Image
              src={image.url}
              height={500}
              width={500}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-200 rounded-l-xl"></div>
          </div>
        ))}
      </div>
      <ImageCarousel images={propertyImages} />
    </div>
  );
};

export default ImageDisplay;
