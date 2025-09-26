import React from "react";

export default function ScoreInput({ player, value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-24">{player}</span>
      <input
        type="number"
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="border rounded px-2 py-1 w-24"
      />
    </div>
  );
}