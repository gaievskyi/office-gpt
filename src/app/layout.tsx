import { Logo, ScreenSize, Show } from "@/ui"

import "./globals.css"

import { Toaster } from "@/ui/kit"

import { IS_DEVELOPMENT } from "@/lib/constants"
import { sans } from "@/lib/fonts"
import { cn } from "@/lib/utils"

export const metadata = {
  title: "OfficeGPT - AI business assistant",
  description: "",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(sans.className, "bg-[#232328]")}>
        <Logo />
        <div className="flex-1">{children}</div>
        <Toaster />
        <Show when={IS_DEVELOPMENT}>
          <ScreenSize />
        </Show>
      </body>
    </html>
  )
}
