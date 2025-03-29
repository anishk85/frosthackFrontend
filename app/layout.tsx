"use client";

import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Provider } from "react-redux";
import { store } from "@/lib/store"; // Adjust path to your store

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Provider store={store}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <SidebarProvider>
              <main className="flex-1 flex flex-col">{children}</main>
            </SidebarProvider>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
