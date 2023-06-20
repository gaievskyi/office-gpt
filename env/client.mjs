// @ts-check

import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const env = createEnv({
  clientPrefix: "PUBLIC_",
  client: {
    // SOME_VARIABLE: z.string().min(1),
  },
  runtimeEnv: process.env,
})
