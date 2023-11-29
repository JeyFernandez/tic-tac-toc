'use client'
// Importa useState para manejar el estado de la ventana emergente
import React, { useState } from "react";
import Tablero from "./tablero"

const GatoGame = () => {
  const [historial, setHistorial] = useState([{ cuadros: Array(9).fill(null) }]);
  const [pasoActual, setPasoActual] = useState(0);
  const [showWinnerModal, setShowWinnerModal] = useState(false); 
  const [showEmpateModal, setShowEmpateModal] = useState(false); 
  const [winner, setWinner] = useState(null); 
  const [empate, setEmpate] = useState(false);
  const cuadros = historial[pasoActual].cuadros;

const handleClick = (indice: any) => {
    const cuadrosTemp = [...cuadros];
    if (calcularGanador(cuadrosTemp) || cuadrosTemp[indice]) {
      return;
    }

    cuadrosTemp[indice] = turnoActual();
    setHistorial(historial.concat([{ cuadros: cuadrosTemp }]));

    const ganador = calcularGanador(cuadrosTemp);
    if (ganador) {
      setWinner(ganador);
      setShowWinnerModal(true); // Mostrar la ventana emergente si hay un ganador
    } else if (cuadrosTemp.every((cuadro) => cuadro !== null)) {
      // Verificar si hay un empate
      setEmpate(true);
      setShowEmpateModal(true); // Mostrar la ventana emergente si hay un empate
    }

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
    setShowWinnerModal(false);
  };

  const turnoActual = () => {
    return pasoActual % 2 === 0 ? "X" : "O";
  };

  // Función para cerrar la ventana emergente
  const handleCloseWinnerModal = () => {
    setShowWinnerModal(false);
    reiniciar();
  };

  const handleCloseEmpateModal = () => {
    setShowEmpateModal(false);
    reiniciar();
  };

  const winnerModal = (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 ">
      <div className="bg-black p-8 rounded-md text-center">
        <h2 className="text-2xl font-bold mb-4">¡Felicidades!</h2>
        <p className="text-lg mb-4">{winner} es el ganador.</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCloseWinnerModal}
        >
          Cerrar
        </button>
      </div>
    </div>
  );

  const empateModal = (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-black p-8 rounded-md text-center">
        <h2 className="text-2xl font-bold mb-4">¡Empate!</h2>
        <p className="text-lg mb-4">No hay ganador.</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCloseEmpateModal}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-md shadow-lg space-y-3 mb-10">
        <h1 className="text-#000 font-bold text-4xl">Gato Game</h1>
      </div>
      <Tablero cuadros={cuadros} onClick={handleClick} />
      <div className="text-#000 text-4xl font-bold mt-10">{calcularGanador(cuadros) ? `Ganador: ${calcularGanador(cuadros)}` : `Turno: ${turnoActual()}`}</div>
      <div className="flex flex-row items-center justify-center w-screen h-screen space-x-5 mt-5">
        <button
          className="bg-transparent hover:bg-[#dc2626] text-[#dc2626] font-semibold hover:text-white py-2 px-4 border border-[#dc2626] hover:border-transparent rounded transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          onClick={retroceder}
        >
          Retroceder
        </button>
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          onClick={avanzar}
        >
          Avanzar
        </button>
        <button
          className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          onClick={reiniciar}
        >
          Reiniciar
        </button>
      </div>
      {showWinnerModal && winnerModal}
      {showEmpateModal && empateModal}
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
