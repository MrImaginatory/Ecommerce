import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "./providers/QueryProvider";
import Navbar from "@/components/Navbar/Navbar";
import { ThemeProvider } from "@/components/Theme/ThemeProvider";
import fs from "fs/promises";
import path from "path";

export async function generateMetadata(): Promise<Metadata> {
  const configPath = path.join(process.cwd(), "public/data/site-config.json");
  let config;
  try {
    const file = await fs.readFile(configPath, "utf-8");
    config = JSON.parse(file);
  } catch (e) {
    config = {};
  }

  return {
    title: config.siteName ? `${config.siteName} - Premium Ecommerce Experience` : "Apple - Premium Ecommerce Experience",
    description: "Experience the pinnacle of product design and engineering.",
    icons: {
      icon: config.favicon || "/favicon.ico",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <QueryProvider>
            <Navbar />
            {children}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
