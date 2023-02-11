import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
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
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(animal),
      //prompt: "cual es el resultado de calcular dos mas dos",
      temperature: 0.7,
      max_tokens: 2000,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
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
  return ` El siguiente texto es el resultado de una grabacion de una llamada, se necesita extraer el "problema", si el problema tiene que ver con informatica o comunicaciones, el "nombre" de la persona, "telefono", nombre del departamento y de la UEB, ademas de una "solucion" al problema en cuestion, y devuelve la informacion como un json, con todo en minusculas y sin tildes. El texto es el siguiente: ${capitalizedAnimal}
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