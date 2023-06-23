"use client"

import { cn } from '@/lib/utils'
import { type PropsWithChildren } from "react"

type LogoProps =  PropsWithChildren & {
  withAnimation?:boolean
}

export const Logo = ({ children, withAnimation }: LogoProps) => (
  <div className="group flex items-center gap-2">
    <div className={cn({
      "transition duration-500 ease-out group-hover:rotate-[360deg]": withAnimation
    })}>
      <svg
        width="30"
        height="30"
        viewBox="0 0 46 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.06274 19.6316C6.89542 20.4609 6.81541 21.3043 6.81541 22.169C6.81541 29.6181 13.0642 35.678 20.7388 35.678C28.4208 35.678 34.6696 29.5968 34.6696 22.1265C34.6696 19.6032 33.9567 17.1722 32.6255 15.0601C29.5193 17.2148 25.8529 18.4906 22.012 18.7173C21.5536 18.7598 21.1317 18.7598 20.7388 18.7598C15.3484 18.7598 10.2199 16.6052 6.29164 12.6928L4.05835 10.4673L6.28436 8.23468C10.1762 4.34357 15.312 2.20309 20.7388 2.20309C21.0008 2.20309 21.2626 2.20309 21.5245 2.22436C26.8204 2.40864 31.7598 4.55619 35.4481 8.26303C39.1653 12.0053 41.2167 16.9242 41.2167 22.1265C41.2167 33.1195 32.029 42.0569 20.7388 42.0569C9.44879 42.0569 0.268311 33.1335 0.268311 22.169C0.268311 19.5466 0.806628 16.9382 1.83233 14.5356L7.06274 19.6316ZM13.8179 10.4673C15.6162 11.5496 17.9179 12.3866 20.7361 12.3866C20.9826 12.3866 21.2387 12.3838 21.4432 12.3639L21.5778 12.354C23.811 12.2293 25.9613 11.5807 27.8607 10.4807C25.8711 9.32688 23.6044 8.67339 21.2343 8.59614L21.0773 8.58692C20.9631 8.57771 20.8503 8.58126 20.7361 8.58126C18.2467 8.58126 15.9036 9.22552 13.8179 10.4673Z"
          fill="#FF5C21"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M39.8649 0L35.4821 4.2696L40.0345 8.70505L44.4174 4.43545L39.8649 0Z"
          fill="#FF5C21"
        />
      </svg>
    </div>
    {children}
  </div>
)
