import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "./providers/QueryProvider";
import Navbar from "@/components/Navbar/Navbar";
import { ThemeProvider } from "@/components/Theme/ThemeProvider";
import { Toaster } from "react-hot-toast";
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
            <Toaster
              position="bottom-center"
              toastOptions={{
                duration: 3000,
                style: {
                  background: "rgba(25, 25, 25, 0.8)",
                  color: "#fff",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  borderRadius: "12px",
                  padding: "16px 24px",
                  fontSize: "14px",
                  fontWeight: "500",
                  letterSpacing: "-0.01em",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                },
              }}
            />
            <Navbar />
            {children}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
