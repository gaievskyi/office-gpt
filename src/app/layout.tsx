import { DevScreenSize, Logo } from "@/components"

import "@/lib/globals.css"

import { Inter } from "next/font/google"

import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "OfficeGPT (Grazyna)",
  description: "AI office helper",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "bg-[#232328]")}>
        <Logo />
        <div className="flex-1">{children}</div>
        <DevScreenSize />
      </body>
    </html>
  )
}
