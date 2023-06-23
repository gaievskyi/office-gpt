import { z } from "zod"

export const DepartmentSchema = z.object({
  departmentName: z.string(),
  match: z.number().min(0).max(100),
})

export const CompletionSchema = z.object({
  role: z.string(),
  requirements: z.array(z.string()),
  suggestedDepartments: z.array(DepartmentSchema),
})

export type Completion = z.infer<typeof CompletionSchema>
