"use client";

import { navData } from "@/lib/data/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

const FooterNav = () => {
  const pathname = usePathname();

  return (
    <div className="pt-12 pb-10 md:py-8 border-b border-neutral-900/10 grid grid-cols-2 max-md:gap-x-5 max-md:gap-y-8 md:flex items-center justify-between">
      {navData.map((item, i) => (
        <Link
          href={item.path}
          key={i}
          className={`font-medium text-xl md:text-base transition-colors hover:text-primary ${
            pathname === item.path ? "text-primary" : ""
          }`}
        >
          {item.name}.
        </Link>
      ))}
    </div>
  );
};

export default FooterNav;
