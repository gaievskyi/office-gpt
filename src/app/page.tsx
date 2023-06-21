"use client"

import { Output } from "@/components"
import { Bot, Loader } from "lucide-react"
import { useRef, useState, useTransition } from "react"

import { prompt, type Completion } from "./action"

export default function Home() {
  const [completion, setCompletion] = useState<Completion>({
    role: "",
    requirements: [],
    suggestedDepartments: [],
  })
  const formRef = useRef<HTMLFormElement | null>(null)

  const [isPending, startTransition] = useTransition()

  const onSubmit = (formData: FormData) => {
    startTransition(async () => {
      const response = await prompt(formData)
      if (!response) return
      setCompletion(response)
      formRef.current?.reset()
    })
  }

  return (
    <main className="flex min-h-screen flex-wrap items-start justify-center gap-8 py-6 text-white">
      <div className="container flex flex-col gap-5 px-4 xl:max-w-[55%]">
        <div className="flex flex-col gap-5">
          <form action={(formData) => void onSubmit(formData)} ref={formRef} className="flex flex-col gap-4">
            <label htmlFor="content">Wklej ofertę pracy</label>
            <textarea
              placeholder="Seeking .NET/C# Developer proficient in WinForms, WPF, and Devexpress. Task: optimize a WPF time scheduler and transform WinForms to WPF. Senior/Regular+ level, English B2. Duration: 4-6 months. Contact: ada@spyro-soft.com"
              name="content"
              id="content"
              className="min-h-[200px] rounded-xl bg-[#2F2F38] p-4"
            />
            <button
              type="submit"
              disabled={isPending}
              className="flex min-w-[120px] max-w-[180px] items-center justify-center gap-2 rounded-full border-white bg-white p-4 text-black transition-all hover:brightness-90 disabled:cursor-not-allowed disabled:border-2 disabled:bg-transparent disabled:text-white"
            >
              {isPending ? (
                <>
                  <Loader className="animate-spin" size={20} /> <span className="text-base">Działam..</span>
                </>
              ) : (
                <>
                  <Bot size={20} />
                  <span className="text-base">Zacznij z AI</span>
                </>
              )}
            </button>
          </form>
        </div>
        <Output {...completion} isLoading={isPending} />
      </div>
    </main>
  )
}
