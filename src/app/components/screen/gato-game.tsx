"use client";
import React, { useState } from "react";
import Tablero from "./tablero";
import "./styles.css";
const GatoGame = () => {
  const [historial, setHistorial] = useState([
    { cuadros: Array(9).fill(null) },
  ]);
  const [pasoActual, setPasoActual] = useState(0);
  const cuadros = historial[pasoActual].cuadros;

  const handleClick = (indice: any) => {
    const nuevosCuadros = cuadros.slice();
    if (calcularGanador(nuevosCuadros) || nuevosCuadros[indice]) {
      //mandar un mensaje de que ya hay un ganador o que estan empatado
      alert("Ya hay un ganador o estan empatados");
    }
    nuevosCuadros[indice] = turnoActual();
    setHistorial(
      historial.slice(0, pasoActual + 1).concat([
        {
          cuadros: nuevosCuadros,
        },
      ])
    );
    setPasoActual(pasoActual + 1);
  };

  const retroceder = () => {
    setPasoActual(Math.max(pasoActual - 1, 0));
  };

  const avanzar = () => {
    setPasoActual(Math.min(pasoActual + 1, historial.length - 1));
  };

  const reiniciar = () => {
    setHistorial([{ cuadros: Array(9).fill(null) }]);
    setPasoActual(0);
  };

  const turnoActual = () => {
    return pasoActual % 2 === 0 ? "X" : "O";
  };

  const ganador = calcularGanador(cuadros);
  const status = ganador ? `Ganador: ${ganador}` : `Turno: ${turnoActual()}`;

  return (
    <div
      className="
        flex flex-col items-center justify-center w-screen h-screen
    "
    >
      <div
        className="
          flex flex-col items-center justify-center w-screen h-screen
          bg-gradient-to-r from-fuchsia-500 to-cyan-500
          rounded-md shadow-lg
          space-y-5
    "
      >
        <h1
          className="
          text-#000 
      "
        >
          Gato Game
        </h1>
      </div>
      <Tablero cuadros={cuadros} onClick={handleClick} />
      <div
        className="
          text-#000 text-4xl font-bold mt-10
      "
      >
        {status}
      </div>
      <div
        className="
          flex flex-row items-center justify-center w-screen h-screen space-x-10 mt-10
      "
      >
        <button
          className="bg-transparent hover:bg-[#dc2626] text-[#dc2626] font-semibold hover:text-white py-2 px-4 border border-[#dc2626] hover:border-transparent rounded"
          onClick={retroceder}
        >
          {" "}
          Retroceder
        </button>
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={avanzar}
        >
          Avanzar
        </button>
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={reiniciar}
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
};
// Función para calcular el ganador
const calcularGanador = (cuadros: any) => {
  const lineasGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lineasGanadoras.length; i++) {
    const [a, b, c] = lineasGanadoras[i];
    if (cuadros[a] && cuadros[a] === cuadros[b] && cuadros[a] === cuadros[c]) {
      return cuadros[a];
    }
  }
  return null;
};

export default GatoGame;
