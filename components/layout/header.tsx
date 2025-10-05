"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Nav from "./nav";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`h-20 py-[3.2rem] w-full sticky top-0 left-0 flex items-center z-999 transition-colors duration-300 ${
        isScrolled ? "bg-beta" : ""
      }`}
    >
      <div className="flex items-center justify-between container px-5 md:px-[3.335rem] md:max-w-none">
        <Link
          href="#"
          className="mr-auto flex text-4xl h-9 leading-none text-white font-light"
        >
          <Image
            src="https://theflex.global/_next/image?url=https%3A%2F%2Flsmvmmgkpbyqhthzdexc.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fwebsite%2FUploads%2FWhite_V3%2520Symbol%2520%26%2520Wordmark.png&w=256&q=75"
            className={`h-full w-auto ${
              isScrolled ? "block" : "hidden dark:block"
            }`}
            width={256}
            height={75}
            alt="Logo"
          />
          <Image
            src="https://theflex.global/_next/image?url=https%3A%2F%2Flsmvmmgkpbyqhthzdexc.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fwebsite%2FUploads%2FGreen_V3%2520Symbol%2520%26%2520Wordmark%2520(1).png&w=256&q=75"
            className={`h-full w-auto ${isScrolled ? "hidden" : "dark:hidden"}`}
            width={256}
            height={75}
            alt="Logo"
          />
        </Link>

        <Nav isScrolled={isScrolled} />
        <div className="max-md:hidden">
          <Link
            href="#"
            className="pt-[0.78125rem] px-[1.05rem] pb-[0.885625rem] font-medium text-sm text-center flex relative items-center justify-center text-foreground"
          >
            English
          </Link>
        </div>
        <div className="max-md:hidden">
          <Link
            href="#"
            className="pt-[0.78125rem] px-[1.05rem] pb-[0.885625rem] font-medium text-sm text-center flex relative items-center justify-center text-foreground"
          >
            £GRB
          </Link>
        </div>

        <div className="md:sr-only">
          <Sheet>
            <SheetTrigger className="md:sr-only">
              <div className="size-10 bg-[#ffffff0d] cursor-pointer flex justify-center items-center">
                <div className="[grid-area:1/1/2/2] flex flex-col items-end gap-y-1.5">
                  <span className="h-px w-5 bg-white"></span>
                  <span className="h-px w-5 bg-white"></span>
                  <span className="h-px w-2.5 bg-white"></span>
                </div>
              </div>
            </SheetTrigger>
            <SheetContent className="bg-[#ECF0F4] w-full z-99999 border-0">
              <SheetHeader className="sr-only">
                <SheetTitle>Sidebar</SheetTitle>
              </SheetHeader>

              <div>
                <div className="mb-6">
                  <Link
                    href={`/`}
                    className="mr-auto flex text-4xl h-9 leading-none text-white font-light"
                  >
                    <Image
                      src="https://theflex.global/_next/image?url=https%3A%2F%2Flsmvmmgkpbyqhthzdexc.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fwebsite%2FUploads%2FWhite_V3%2520Symbol%2520%26%2520Wordmark.png&w=256&q=75"
                      className="h-full w-auto hidden dark:block"
                      width={256}
                      height={75}
                      alt="Logo"
                    />
                    <Image
                      src="https://theflex.global/_next/image?url=https%3A%2F%2Flsmvmmgkpbyqhthzdexc.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fwebsite%2FUploads%2FGreen_V3%2520Symbol%2520%26%2520Wordmark%2520(1).png&w=256&q=75"
                      className="h-full w-auto dark:hidden"
                      width={256}
                      height={75}
                      alt="Logo"
                    />
                  </Link>
                </div>

                <ul className="flex flex-col mb-4">
                  <li className="py-3">
                    <Link href="#" className="h-full text-lg leading-[150%]">
                      Landlords
                    </Link>
                  </li>
                  <li className="py-3">
                    <Link href="#" className="h-full text-lg leading-[150%]">
                      About us
                    </Link>
                  </li>
                  <li className="py-3">
                    <Link href="#" className="h-full text-lg leading-[150%]">
                      Careers
                    </Link>
                  </li>
                  <li className="py-3">
                    <Link href="#" className="h-full text-lg leading-[150%]">
                      Contact
                    </Link>
                  </li>
                </ul>

                <div className="flex flex-col gap-y-4">
                  <Link href="/register">
                    <Button className="w-fit bg-primary rounded-none text-white">
                      English
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
