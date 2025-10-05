import Link from "next/link";
import FooterNav from "./footer-nav";
import NewsletterSubscriptionForm from "./newsletter-form";

const Footer = () => {
  return (
    <footer className="relative bg-beta text-beta-foreground mt-[7rem]">
      <div className="bg-beta pb-16 md:pb-12.5 z-30 relative">
        <div className="container lg:max-w-[90rem] max-md:px-5 grid grid-cols-2 md:grid-cols-[repeat(16,1fr)] gap-x-[1.041667rem] mx-auto">
          <NewsletterSubscriptionForm />
          <div className="col-span-2 md:col-span-8 md:col-start-8 flex flex-col justify-between">
            <FooterNav />
            <div className="flex flex-col md:grid grid-cols-8 gap-x-4 pt-10 md:py-6">
              <div className="flex flex-col gap-y-5 mb-10 md:grid grid-cols-2 col-span-4 gap-x-4">
                <div>
                  <div className="text-base md:text-sm mb-2 md:mb-3.5 font-bold">
                    Head office
                  </div>
                  <div className="text-base md:text-sm text-neutral-400">
                    London <br />
                    Paris <br />
                    Algiers
                  </div>
                </div>
                <div>
                  <div className="text-base md:text-sm mb-2 md:mb-3.5 font-bold">
                    Branch office
                  </div>
                  <div className="text-base md:text-sm text-neutral-400">
                    London <br />
                    Paris <br />
                    Algiers
                  </div>
                </div>
              </div>
              <div className="col-start-6 col-span-3 flex flex-col gap-y-5 md:gap-y-2">
                <div>
                  <div className="text-neutral-400 text-sm max-md:mb-2 md:text-xs">
                    Email
                  </div>
                  <Link
                    href={`#`}
                    className="text-base md:text-2xl max-md:font-medium hover:text-primary transition-colors"
                  >
                    info@theflex.global
                  </Link>
                </div>
                <div>
                  <div className="text-neutral-400 text-sm max-md:mb-2 md:text-xs">
                    Phone United Kingdom
                  </div>
                  <Link
                    href={`#`}
                    className="text-base md:text-2xl max-md:font-medium hover:text-primary transition-colors"
                  >
                    +44 77 2374 5646
                  </Link>
                </div>
                <div>
                  <div className="text-neutral-400 text-sm max-md:mb-2 md:text-xs">
                    Phone Algeria
                  </div>
                  <Link
                    href={`#`}
                    className="text-base md:text-2xl max-md:font-medium hover:text-primary transition-colors"
                  >
                    +33 7 57 59 22 41
                  </Link>
                </div>
                <div>
                  <div className="text-neutral-400 text-sm max-md:mb-2 md:text-xs">
                    Phone France
                  </div>
                  <Link
                    href={`#`}
                    className="text-base md:text-2xl max-md:font-medium hover:text-primary transition-colors"
                  >
                    +33 6 44 64 57 17
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:grid grid-cols-8 gap-x-4 text-sm md:text-xs text-neutral-400 max-md:pt-10">
              <div className="col-span-4 mt-auto max-md:mb-3">
                © 2025, The Flex. All Rights Reserved.
              </div>
              <div className="col-span-3 col-start-6 flex max-md:gap-8 md:justify-between items-center mt-auto">
                <Link
                  href={`#`}
                  className="hover:text-primary transition-colors"
                >
                  Legal notice
                </Link>
                <Link
                  href={`#`}
                  className="hover:text-primary transition-colors"
                >
                  Privacy policy
                </Link>
                <Link
                  href={`#`}
                  className="hover:text-primary transition-colors"
                >
                  LinkedIn
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
