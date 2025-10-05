import { Mail } from "lucide-react";
import { Button } from "../ui/button";

const NewsletterSubscriptionForm = () => {
  return (
    <div className="col-span-2 md:col-span-5 p-10 md:p-12.5 pt-8 md:pt-[1.666875rem] bg-[#EEEEEE] md:col-start-2 -mt-[7.083125rem] rounded-xl">
      <div className="size-12 md:size-16 flex items-center justify-center mb-6 md:mb-8">
        <Mail className="size-12 md:size-16 text-beta" />
      </div>
      <div className="text-beta mb-3 md:mb-2.5 font-medium text-2xl md:text-5xl leading-none">
        Join
        <br /> The Flex
      </div>
      <div className="mb-8 md:mb-5 text-beta/50 text-base md:text-sm">
        Sign up now and stay up to date on our latest news and exclusive deals
        including 5% off your first stay!
      </div>
      <form action="#" className="flex flex-col gap-y-2">
        <div className="w-full">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full bg-transparent px-6 md:px-5 py-3 md:py-4 border border-beta/10 text-beta text-base md:text-sm placeholder:text-beta/50 rounded"
          />
        </div>
        <Button className="w-full py-3 md:py-4 bg-beta">Subscribe</Button>
      </form>
      <div className="mt-2.5 text-xs text-neutral-500">
        Don&apos;t worry about spam. We hate it too!
      </div>
    </div>
  );
};

export default NewsletterSubscriptionForm;
