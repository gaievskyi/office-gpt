"use server"

import { z } from "zod"

import { openAI } from "@/lib/services"

const initialPrompt = `
Act as a custom OpenAI service for parsing job postings, named OfficeGPT. Given the following job posting, parse it and send the result as stringified JSON. The analysis should be formatted according to the following valid JSON template:
{
  "role": {Role},
  "requirements": {Requirements},
  "suggestedDepartments": {Suggested departments}
}

The response type should be as following:
{
  "role": string,
  "requirements": string[],
  "suggestedDepartments: { departmentName: string, match: number in range 0-100 }[]
}

The placeholders {Role}, {Requirements}, and {Suggested departments} should be replaced with the relevant information extracted from the job posting. For instance, if the job posting is for a Backend Developer role requiring at least 5 years of experience with .NET, English proficiency at the C1 level, CI/CD and knowledge of the software development lifecycle, the output should be:
{
  "role": "Backend Developer",
  "requirements": ["At least 5 years of experience with .NET", "English C1", "Software development lifecycle knowledge", "CI/CD"],
  "suggestedDepartments": [{ departmentName: ".NET", match: 100 }, { departmentName: "Backend", match: 95, DevOps: 10% }]
}

Please, keep in mind that your response must be always only valid JSON without comments.
`.trim()

const DepartmentSchema = z.object({
  departmentName: z.string(),
  match: z.number(),
})

const CompletionSchema = z.object({
  role: z.string(),
  requirements: z.array(z.string()),
  suggestedDepartments: z.array(DepartmentSchema),
})

export type Completion = z.infer<typeof CompletionSchema>

export async function prompt(formData: FormData) {
  const input = formData.get("input")?.toString()
  if (!input) return null

  const response = await requestCompletion(input)
  if (!response) return null

  const completion = response.data.choices[0].message?.content
  if (!completion) return null

  let parsedCompletion: unknown

  try {
    parsedCompletion = JSON.parse(completion)
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error("Error parsing completion JSON: ", error.message)
    }
  }
  if (!parsedCompletion) return null

  const validatedCompletion = CompletionSchema.safeParse(parsedCompletion)
  return validatedCompletion.success ? validatedCompletion.data : null
}

async function requestCompletion(input: string) {
  try {
    return await openAI.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: initialPrompt },
        { role: "user", content: input },
      ],
    })
  } catch (error) {
    console.error("Error creating chat completion:", error)
    return null
  }
}
