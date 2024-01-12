// pages/api/promptOptimizer
import { OpenAI, ChatOpenAI } from "@langchain/openai";
import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { MultiPromptChain } from "langchain/chains";

const openAIKey = process.env.OPENAI_API_KEY;

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { prompts } = req.body;
      console.log(`Prompts: ${JSON.stringify(prompts)}`);
      if (!prompts) {
        res.status(400).json({ message: "Prompts are required" });
        return;
      }

      const llm = new ChatOpenAI({
        modelName: "gpt-4",
        temperature: 0,
      });
      console.log(`type of prompts: ${typeof prompts}`);
      const mainTemplate = (prompt) =>
        `Create 3 answers for the following prompt:\n ${prompt}`;
      const mainTemplateArray = prompts.map((prompt) => mainTemplate(prompt));
      // console.log(`Main Template Array: ${JSON.stringify(mainTemplateArray)}`);
      // console.log(typeof mainTemplateArray);
      console.log(`Main Template Array type:  ${typeof mainTemplateArray}`);
      const multiPromptChain = MultiPromptChain.fromLLMAndPrompts(llm, {
        promptNames: prompts.map((prompt, index) => `prompt ${index + 1}`),
        promptDescriptions: prompts.map(
          (prompt, index) => `prompt ${index + 1}`
        ),
        promptTemplates: mainTemplateArray,
      });
      // console.log(multiPromptChain);

      const promises = mainTemplateArray.map((promptTemplate) => {
        return multiPromptChain.invoke({ input: promptTemplate });
      });
      console.log(`Executing ${mainTemplateArray.length} prompts...`);
      let answers = [];
      await Promise.all(promises)
        .then((results) => {
          answers = results.map((result) => result);
          console.log(answers);
        })
        .catch((error) => {
          console.error("An error occurred--------------", error);
        });

      res.status(200).json({ status: "completed", answers });
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ message: "Error sending message" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
