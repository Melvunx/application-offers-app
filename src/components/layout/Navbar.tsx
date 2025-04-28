"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "../ui/button";

export function Navbar() {
  const router = useRouter();

  const navLinks = [
    {
      link: "/dashboard",
      label: "Les offres",
    },
    {
      link: "/control-pannel",
      label: "Gestionnaire d'offres",
    },
  ];

  return (
    <nav className="flex flex-1">
      <ul className="flex items-center space-x-4">
        {navLinks.map((navLink, index) => {
          const isActive = router.pathname === navLink.link;

          return (
            <li key={index}>
              <Link href={navLink.link}>
                <Button
                  variant={isActive ? "ghost" : "default"}
                  className="flex items-center space-x-2"
                >
                  <p
                    className={isActive ? "text-indigo-500" : "text-slate-300"}
                  >
                    {navLink.label}
                  </p>
                </Button>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
