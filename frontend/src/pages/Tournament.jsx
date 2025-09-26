import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import Table from "../components/Table";

export default function Tournament() {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [results, setResults] = useState(null);

  useEffect(() => {
    api.get(`/tournaments`).then(res => {
      const found = res.data.find(t => t.id === id);
      setTournament(found);
    });
    api.get(`/results/${id}`).then(res => setResults(res.data));
  }, [id]);

  if (!tournament) return <p>Chargement...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{tournament.name}</h1>
      <p>Date : {tournament.date}</p>
      <h2 className="text-xl mt-6 font-semibold">Résultats</h2>
      {results?.rounds?.map(round => (
        <div key={round.round} className="mt-4">
          <h3 className="font-bold">Manche {round.round}</h3>
          {round.tables.map(table => (
            <Table key={table.table} table={table} />
          ))}
        </div>
      ))}
    </div>
  );
}