import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setAnimalInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  
  
  let string = result;
  let objeto = eval("(" + string + ")");
  if(!objeto){
    objeto = "";
  }
/*
  console.log(objeto.problema);
  console.log(objeto.nombre);
  console.log(objeto.telefono);
  console.log(objeto.departamento);
  console.log(objeto.solucion);
*/

console.log(result);
  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>CHAT GPT</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Introduzca su peticion"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Generar Respuesta" />
        </form>
        { <div className={styles.result}>
          <p>Problema: {objeto.problema}</p>
          <p>Nombre: {objeto.nombre}</p>
          <p>Telefono: {objeto.telefono}</p>
          <p>Departamento: {objeto.departamento}</p>
          <p>Posible Solucion: {objeto.solucion}</p>
          <p>UEB: {objeto.ueb}</p>
        </div> }{result}
      </main>
    </div>
  );
}
