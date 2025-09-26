import React, { useEffect, useState } from "react";
import api from "../api";
import Charts from "../components/Charts";

export default function Stats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/tournaments").then(res => {
      // simplifié : moyenne des scores par joueur
      const data = {};
      res.data.forEach(t => {
        if (t.results) {
          t.results.finals.forEach(r => {
            if (!data[r.player]) data[r.player] = [];
            data[r.player].push(r.total);
          });
        }
      });
      setStats(data);
    });
  }, []);

  if (!stats) return <p>Chargement...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Statistiques</h1>
      <Charts stats={stats} />
    </div>
  );
}