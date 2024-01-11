// ./config.js
import {
  assistant_math,
  assistant_validator,
  assistant_code_interpreter,
  assistant_browser,
  assistant_upwork_job_extractor,
  assistant_upwork_job_analyzer,
  assistant_upwork_cover_letter_writer,
} from "./assistantConfig";
const commonConfig = {};

const devConfig = {
  ...commonConfig,
  openaiApiKey: process.env.OPENAI_API_KEY,
  assistant: {
    assistant_math,
    assistant_validator,
    assistant_code_interpreter,
    assistant_browser,
    assistant_upwork_job_extractor,
    assistant_upwork_job_analyzer,
    assistant_upwork_cover_letter_writer,
  },
  // other development specific configurations
};

const prodConfig = {
  ...commonConfig,
  openaiApiKey: process.env.PROD_OPENAI_API_KEY,
  assistantParams: {
    name: "Production Assistant",
    instructions:
      "You are a personal math tutor. Write and run code to answer math questions.",
    model: "gpt-4-1106-preview",
    tools: [{ type: "code_interpreter" }],
  },
  // other production specific configurations
};

// const config = process.env.NODE_ENV === "development" ? devConfig : prodConfig;
const config = devConfig;

export default config;
