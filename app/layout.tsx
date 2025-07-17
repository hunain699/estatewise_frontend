import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Estate Wise - Luxury Real Estate",
  description: "Find your dream luxury property with Estate Wise",
  icons: {
    icon: "/logo/5.png", // or "/favicon.png" or an array of icons
  },
  generator: "v0.dev",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
