import React, { useEffect, useState } from "react";
import api from "../api";

export default function Home() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    api.get("/tournaments").then(res => setTournaments(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Tournois</h1>
      <ul>
        {tournaments.map(t => (
          <li key={t.id} className="p-2 border-b">
            {t.name} — {t.date}
          </li>
        ))}
      </ul>
    </div>
  );
}