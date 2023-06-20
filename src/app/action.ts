"use server"

import { z } from "zod"

import { openAI } from "@/lib/services"

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
  const content = formData.get("content")?.toString()
  if (!content) return null
  const completion = await openAI.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: initialPrompt },
      { role: "user", content },
    ],
  })

  const response = completion.data.choices[0].message?.content
  if (!response) return null

  let parsedCompletion

  try {
    parsedCompletion = await JSON.parse(response)
  } catch (error) {
    console.error("Error parsing JSON:", error, completion)
    return null
  }

  const validatedCompletion = CompletionSchema.safeParse(parsedCompletion)
  if (!validatedCompletion.success) return null

  return validatedCompletion.data
}

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
