//import { Configuration, OpenAIApi } from "openai";
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  //apiKey: "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",
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const animal = req.body.animal || '';
  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Porfavor introduzca un mensaje",
      }
    });
    return;
  }

  try {
    const openai = new OpenAIApi(configuration);
    const params = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: generatePrompt(animal) }],
    };
    /*const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(animal),
      //prompt: "cual es el resultado de calcular dos mas dos",
      temperature: 0.7,
      max_tokens: 2000,
    });*/
    const completion = await openai.createChatCompletion(params);
    const data = completion.data.choices[0].message.content;
    console.log(data);
    res.status(200).json({ result: data });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `extrae el "problema", "asignado" si el problema tiene que ver con "informatica" o "comunicaciones", el "nombre" de la persona, "telefono", nombre del departamento y de la UEB (que puedeb ser de Las Tunas, Puerto Padre, Jesus Menendez, Manati, Jobabo, Majibacoa, Colombia, Amancio), ademas de una "solucion" al problema en cuestion, y devuelve la informacion como un json, con todo en minusculas y sin tildes. El texto es el siguiente: ${capitalizedAnimal}
`;
}
/*
function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return ` A continuacion se proporciona cierta informacion. Si la misma tiene que ver con problemas del fluido electrico, o falta de corriente devuelve: "Problema de Corriente". En caso de ser un problema que trate sobre informatica y comunicaciones devuelve: "InfoCom". En caso de no poder detectar el tipo de informacion devuleva un mensaje de forma chistosa sobre cualquier solucion. El texto es el siguiente: ${capitalizedAnimal}
`;
}
*/