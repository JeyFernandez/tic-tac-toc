// Cuadro.js
import React from "react";
interface CuadroProps {
  valor: string;
  onClick: () => void;
}

const Cuadro = ({ valor, onClick }: CuadroProps) => {
  return (
    <button
      className="
      bg-[#000] text-4xl font-bold border-0 border-[#F86AEF]  w-20 h-20 text"
      onClick={onClick}
    >
      {valor}
    </button>
  );
};

export default Cuadro;
