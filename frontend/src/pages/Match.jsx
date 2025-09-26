import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Timer from "../components/Timer";
import ScoreInput from "../components/ScoreInput";

export default function Match() {
  const { id, round } = useParams();
  const [scores, setScores] = useState({});

  const handleScoreChange = (player, value) => {
    setScores(prev => ({ ...prev, [player]: value }));
  };

  const handleSubmit = () => {
    console.log("Envoi des scores :", scores);
    // TODO: appel API pour sauvegarder
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Saisie des scores — Tournoi {id} / Manche {round}
      </h1>
      <Timer duration={20 * 60} />
      <div className="mt-6 space-y-2">
        {["Alice", "Bob", "Claire", "David"].map(player => (
          <ScoreInput
            key={player}
            player={player}
            value={scores[player] || ""}
            onChange={val => handleScoreChange(player, val)}
          />
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Valider
      </button>
    </div>
  );
}