import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import { Providers } from './providers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notes App",
  description: "Simple notes application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body className={`${geistSans.variable} ${geistMono.variable}`}> */}
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <ThemeProvider>{children}</ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
