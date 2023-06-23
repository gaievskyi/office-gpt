"use client"

import { Output } from "@/ui"
import { Button, Textarea } from "@/ui/kit"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { Bot, Loader } from "lucide-react"
import { useEffect, useRef, useState, useTransition } from "react"

import { useToast } from "@/lib/hooks"
import { type Completion } from "@/lib/schemas"
import { cn } from "@/lib/utils"

import { prompt } from "./action"

const MAX_INPUT_LENGTH = 4086

export default function Home() {
  const formRef = useRef<HTMLFormElement | null>(null)

  const [animationParentRef] = useAutoAnimate({easing: "linear", duration: 400})

  const [completion, setCompletion] = useState<Completion>({
    role: "",
    requirements: [],
    suggestedDepartments: [],
  })
  const [showOutput, setShowOutput] = useState(false)
  const [textAreaCount, setTextAreaCount] = useState(0)

  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  const recalculateLength: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setTextAreaCount(event.target.value.length)
  }

  const isMaxLength = textAreaCount === MAX_INPUT_LENGTH

  const onSubmit = (formData: FormData) => {
    startTransition(async () => {
      const response = await prompt(formData)
      if (!response) {
        toast({
          variant: "destructive",
          title: "Oops!",
          description:
            "Coś poszło nie tak podczas przetwarzania wiadomości. Spróbuj ponownie.",
        })
        return
      }
      setCompletion(response)
      setShowOutput(true)
      toast({
        title: "Sukces!",
        description: "Podsumowanie ogłoszenia o pracę jest gotowe.",
      })
      formRef.current?.reset()
      setTextAreaCount(0)
    })
  }

  useEffect(() => {
    if (showOutput) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [showOutput, completion])

  return (
    <main className="flex flex-wrap items-start justify-center gap-8 py-6 text-white">
      <div className="container flex flex-col gap-12 px-4 md:gap-0 xl:max-w-[55%]">
        <div className="flex flex-col gap-5">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Parsuj oferty z
            <span className="shine ml-2">
              AI
            </span>
          </h1>
          <form action={onSubmit} ref={formRef} className="flex flex-col gap-4">
            <label htmlFor="input">Wklej ofertę pracy</label>
            <Textarea
              maxLength={MAX_INPUT_LENGTH}
              placeholder="Przykład: Seeking .NET/C# Developer proficient in WinForms, WPF, and Devexpress. Task: optimize a WPF time scheduler and transform WinForms to WPF. Senior/Regular+ level, English B2. Duration: 4-6 months. Contact: email@example.com"
              name="input"
              id="input"
              onChange={recalculateLength}
            />
            <small
              className={cn("flex justify-end", {
                "animate-bounce": isMaxLength,
              })}
            >
              <span
                className={cn({
                  "font-bold": isMaxLength,
                })}
              >
                {textAreaCount}/
              </span>
              <span>{MAX_INPUT_LENGTH}</span>
            </small>
            <div className="flex items-end justify-end">
              <Button
                variant="secondary"
                type="submit"
                disabled={isPending}
                className="w-full gap-2 rounded-full md:max-w-[200px]"
              >
                {isPending ? (
                  <>
                    <Loader className="animate-spin" size={20} />
                    <span className="text-base">Przetwarzam..</span>
                  </>
                ) : (
                  <>
                    <Bot size={20} />
                    <span className="text-base">Kontynuuj z AI</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
        <div ref={animationParentRef}>
          {showOutput && <Output {...completion} />}
        </div>
      </div>
    </main>
  )
}
