import { Logo, ScreenSize, Show } from "@/ui"

import "./globals.css"

import { Button, Toaster } from "@/ui/kit"
import { type PropsWithChildren } from "react"
import Link from "next/link"

import { IS_DEVELOPMENT } from "@/lib/constants"
import { sans } from "@/lib/fonts"
import { cn } from "@/lib/utils"

export const metadata = {
  title: "OfficeGPT - AI business assistant",
  description: "",
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(sans.className, "bg-[#232328]")}>
        <div className="flex justify-center p-2">
          <Logo withAnimation>
            <Link href="/">
              <Button
                variant="link"
                className="select-none p-0 text-sm font-medium leading-none text-white"
              >
                OfficeGPT
              </Button>
            </Link>
          </Logo>
        </div>
        <div className="flex-1">{children}</div>
        <Toaster />
        <Show when={IS_DEVELOPMENT}>
          <ScreenSize />
        </Show>
      </body>
    </html>
  )
}
