import React from "react";
import AthleteTable from "../components/AthleteTable"; // Adjust the path based on your project structure

export default function Atletas() {
  return (
    <div>
      <h1>Página de Atletas</h1>
      <p>Bem-vindo à página de Atletas!</p>
      <AthleteTable /> {/* Add the AthleteTable component here */}
    </div>
  );
}
