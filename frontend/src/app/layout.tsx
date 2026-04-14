import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "./providers/QueryProvider";
import Navbar from "@/components/Navbar/Navbar";

export const metadata: Metadata = {
  title: "Apple - Premium Ecommerce Experience",
  description: "Experience the pinnacle of product design and engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <Navbar />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
