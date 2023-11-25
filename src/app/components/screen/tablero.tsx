// Tablero.js
import React from "react";
import Cuadro from "./cuadros";
interface TableroProps {
  cuadros: string[];
  onClick: (indice: number) => void;
}

const Tablero = ({ cuadros, onClick }: TableroProps) => {
  return (
    <div className="
    ">
      <div className="grid grid-cols-3 gap-2 rounded-md bg-gradient-to-r from-fuchsia-500 to-cyan-500 ">
      {cuadros.map((valor, indice) => ( 
        <Cuadro key={indice} valor={valor} onClick={() => onClick(indice)} />
      ))}
    </div>
    </div>

  );
};

export default Tablero;
