import type { Metadata } from "next";
import "./globals.css";
import { Space_Grotesk as Sans } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"

const sans = Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Twotter",
  description: "the Twitter clone",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${sans.className} relative antialiased w-full`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
