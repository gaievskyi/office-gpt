import { env } from "~/env/server.mjs"
import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
  organization: env.OPENAI_API_ORGANIZATION,
  apiKey: env.OPENAI_API_KEY,
})

export const openAI = new OpenAIApi(configuration)
