"use client"

import { Copy } from "lucide-react"

import { useToast } from "@/lib/hooks"
import { cn } from "@/lib/utils"
import { type Completion } from "@/app/action"

export type OutputProps = Completion & { isLoading?: boolean }

const getColorForMatch = (match: number) => {
  if (match >= 80) return "text-green-500"
  if (match >= 50) return "text-yellow-500"
  return "text-red-500"
}

export const Output = ({
  role,
  requirements,
  suggestedDepartments,
  isLoading,
}: OutputProps) => {
  const { toast } = useToast()

  const copy = () => {
    void navigator.clipboard.writeText(
      `
      Role: ${role}
      Requirements: ${requirements.join(", ")}
      Suggested departments:
      ${suggestedDepartments
        .map((dept) => `- ${dept.departmentName}: ${dept.match}%`)
        .join("\n")}
    `.trim()
    )

    toast({
      title: "Skopiowano do schowka!",
    })
  }

  return (
    <div className="flex min-h-[100%] flex-col gap-5 lg:max-w-[60%]">
      <div className="flex flex-col gap-2 rounded-xl bg-[#2F2F38] p-4">
        <>
          <span className="text-xl font-light uppercase text-[#B9B9CA]">
            Rola
          </span>
          <span>{role}</span>
        </>
        <span className="text-xl font-light uppercase text-[#B9B9CA]">
          Wymagania
        </span>
        <div className="flex flex-col">
          {requirements.map((requirement) => (
            <span key={requirement}>&#x2022; {requirement}</span>
          ))}
        </div>
        <span className="text-xl font-light uppercase text-[#B9B9CA]">
          Sugerowane działy
        </span>
        <div className="flex flex-col">
          {suggestedDepartments.map(({ departmentName, match }) => (
            <div className="flex gap-2" key={departmentName}>
              <span className={cn(getColorForMatch(match))}>
                {departmentName}
              </span>
              <span>-</span>
              <span>{match}%</span>
            </div>
          ))}
        </div>
        <button
          onClick={copy}
          disabled={!role || !requirements || !suggestedDepartments}
          className="ml-auto mt-2 flex max-w-[200px] items-center justify-center gap-2 rounded-xl bg-white p-3 text-black transition-all hover:brightness-90 disabled:cursor-not-allowed disabled:brightness-75 hover:disabled:hover:brightness-75"
        >
          <Copy size={16} /> <span className="text-sm">Kopiuj</span>
        </button>
      </div>
    </div>
  )
}
