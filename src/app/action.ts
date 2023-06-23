"use server"

import { CompletionSchema } from "@/lib/schemas"
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
  "role": string, // suggested position (role). Examples: Frontend Developer, Backend Developer, PM, QA Engineer, DevOps Engineer, Software Developer...
  "requirements": string[], // list of job posting requirements
  "suggestedDepartments: { departmentName: string, match: number in range 0-100 }[] // suggested related company departments. Examples: Frontend, Backend, DevOps, PM, QA...
}

The placeholders {Role}, {Requirements}, and {Suggested departments} should be replaced with the relevant information extracted from the job posting. For instance, if the job posting is for a Backend Developer role requiring at least 5 years of experience with .NET, English proficiency at the C1 level, CI/CD and knowledge of the software development lifecycle, the output should be:
{
  "role": "Backend Developer",
  "requirements": ["At least 5 years of experience with .NET", "English C1", "Software development lifecycle knowledge", "CI/CD"],
  "suggestedDepartments": [{ departmentName: ".NET", match: 100 }, { departmentName: "Backend", match: 95 }, { departmentName: "DevOps", match: 10 }]
}

Please, keep in mind that your response must be always only valid JSON without comments.
`.trim()

export async function prompt(formData: FormData) {
  const input = formData.get("input")?.toString().trim()
  if (!input) return null

  const response = await requestCompletion(input)
  if (!response) return null

  const completion = response.data.choices[0].message?.content
  if (!completion) return null

  const parsedCompletion = jsonify(completion)
  if (!parsedCompletion) return null

  const validatedCompletion = CompletionSchema.safeParse(parsedCompletion)
  return validatedCompletion.success ? validatedCompletion.data : null
}

async function requestCompletion(input: string) {
  try {
    const response = await openAI.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: initialPrompt },
        { role: "user", content: input },
      ],
    })
    return response
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating chat completion:", error.message)
    }
  }
  return null
}

function jsonify(string: string): unknown {
  try {
    const parsedString = JSON.parse(string)
    return parsedString
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error("Error parsing JSON: ", error.message)
    }
  }
  return null
}
