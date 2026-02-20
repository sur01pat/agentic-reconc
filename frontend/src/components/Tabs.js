import React from "react";
import "./tabs.css";

export default function Tabs({ active, setActive, counts }) {

  const tabs = ["Reconciled", "Exceptions", "Settled"];

  return (
    <div className="tabs">
      {tabs.map(t => (
        <div
          key={t}
          className={`tab ${active === t ? "active" : ""}`}
          onClick={() => setActive(t)}
        >
          {t} ({counts[t]})
        </div>
      ))}
    </div>
  );
}
