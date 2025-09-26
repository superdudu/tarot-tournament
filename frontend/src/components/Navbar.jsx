import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white p-3 flex gap-4">
      <Link to="/">Accueil</Link>
      <Link to="/stats">Stats</Link>
      <Link to="/history">Historique</Link>
    </nav>
  );
}