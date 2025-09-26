import React from "react";

export default function Table({ table }) {
  return (
    <div className="border p-2 mt-2 rounded bg-white shadow">
      <h4 className="font-semibold">Table {table.table}</h4>
      <ul>
        {table.scores?.map(s => (
          <li key={s.player}>
            {s.player} — {s.score} pts (prises {s.prises}, étoiles {s.etoiles})
          </li>
        ))}
      </ul>
    </div>
  );
}