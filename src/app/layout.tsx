import { DevScreenSize } from "@/components"

import "@/lib/globals.css"

import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "OfficeGPT (Grazyna)",
  description: "AI office helper",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="flex-1">{children}</div>
        <DevScreenSize />
      </body>
    </html>
  )
}
