"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav>
      <Link href="/" className="nav-logo">
        <svg width="24" height="40" viewBox="0 0 60 140">
          <rect x="27" y="50" width="6" height="88" rx="3" fill="#8888AA" />
          <ellipse cx="30" cy="50" rx="9" ry="10" fill="#2A1A12" />
          <path
            d="M30 4 C30 4, 42 18, 43 30 C44 42, 38 48, 30 50 C22 48, 16 42, 17 30 C18 18, 30 4, 30 4Z"
            fill="#FF6B4A"
            opacity="0.9"
          />
          <path
            d="M30 18 C30 18, 37 26, 37 33 C37 39, 34 44, 30 46 C26 44, 23 39, 23 33 C23 26, 30 18, 30 18Z"
            fill="#FFAA3B"
            opacity="0.9"
          />
          <ellipse cx="30" cy="40" rx="4" ry="6" fill="#FFE4A0" opacity="0.8" />
        </svg>
        <div className="nav-wordmark">
          Fire<span>bug</span>
        </div>
      </Link>
      <ul className="nav-links">
        <li>
          <Link
            href="/services"
            className={pathname === "/services" ? "active" : ""}
          >
            What we do
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={pathname === "/about" ? "active" : ""}
          >
            About
          </Link>
        </li>
      </ul>
      <a href="mailto:kayakmind@gmail.com" className="nav-cta">
        Let&apos;s talk
      </a>
    </nav>
  );
}
