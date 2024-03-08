import type { Metadata } from "next";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { Rubik } from "next/font/google";
import "./globals.css";

const inter = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Drug Store",
  description: "Drug store app test task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("h-screen w-screen", inter.className)}>
        <header className="w-full h-1/16 px-5 py-2">
          <ul className="flex flex-row gap-3">
            <li className="text-card-foreground transition hover:scale-110">
              <Link href="/">Shop</Link>
            </li>
            <li className="text-foreground">
              <span>|</span>
            </li>
            <li></li>
          </ul>
        </header>
        {children}
      </body>
    </html>
  );
}
