"use client";

import { navData } from "@/lib/data/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavProps {
  isScrolled: boolean;
}

const Nav = ({ isScrolled }: NavProps) => {
  const pathname = usePathname();

  return (
    <div className="max-md:hidden mr-10 grid justify-items-end relative">
      <nav className="nav-container h-[2.91625rem] flex items-center justify-end px-5 overflow-hidden relative gap-x-15 flex-nowrap [grid-area:1/1/2/2] max-w-[calc(37.75rem+1.25rem)]">
        {navData.map((item) => (
          <Link
            href={item.path}
            key={item.name}
            className={`hover:text-nav-text-active transition whitespace-nowrap text-sm ${
              pathname === item.path ? "text-nav-text-active" : "text-beta"
            } ${isScrolled ? "text-beta-foreground" : ""}`}
          >
            {item.name}.
          </Link>
        ))}
      </nav>
      <div className="nav-toggle size-[2.91625rem] absolute cursor-pointer right-0 top-1/2 -translate-y-1/2 flex justify-center items-center">
        <div className="[grid-area:1/1/2/2] flex flex-col items-end gap-y-1.5">
          <span className="h-px w-0 bg-toggle-line"></span>
          <span className="h-px w-0 bg-toggle-line"></span>
          <span className="h-px w-0 bg-toggle-line"></span>
        </div>
      </div>
    </div>
  );
};

export default Nav;
