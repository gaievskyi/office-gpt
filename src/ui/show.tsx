"use client"

import { type PropsWithChildren } from "react"

type ShowProps = PropsWithChildren & {
  when: boolean
}

export const Show = ({ children, when }: ShowProps) => (when ? children : null)
