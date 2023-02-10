// import { Configuration, OpenAIApi } from "openai";

// const configuration = new Configuration({
//     organization: "org-Ey12QELoJ2v4S5ple7Qa4z4m",
//     apiKey: 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,
// });

// const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

// const axios = require('axios');

// const API_KEY = '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';
// const API_URL = 'https://api.openai.com/v1/completions';

// async function generateText(prompt) {
//   try {
//     const response = await axios.post(API_URL, {
//       prompt: prompt,
//       max_tokens: 100,
//       n: 1,
//       stop: '',
//       temperature: 0.5
//     }, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${API_KEY}`
//       }
//     });

//     const text = response.data.choices[0].text;
//     console.log(text);
//   } catch (error) {
//     console.error(error);
//   }
// }

// generateText('Write a story about a dog');

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.listModels();
