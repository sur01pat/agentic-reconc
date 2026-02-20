import React from "react";
import "./kpi.css";

export default function KPIBar({ total, reconciled, exceptions, settled }) {

  const pct = (value) =>
    total ? Math.round((value / total) * 100) : 0;

  return (
    <div className="kpi-bar">

      <div className="kpi">
        <div className="kpi-title">Auto-Matched</div>
        <div className="kpi-value">
          {reconciled} ({pct(reconciled)}%)
        </div>
      </div>

      <div className="kpi">
        <div className="kpi-title">Exceptions</div>
        <div className="kpi-value">
          {exceptions} ({pct(exceptions)}%)
        </div>
      </div>

      <div className="kpi">
        <div className="kpi-title">Settled</div>
        <div className="kpi-value">
          {settled} ({pct(settled)}%)
        </div>
      </div>

      <div className="kpi">
        <div className="kpi-title">Total Transactions</div>
        <div className="kpi-value">
          {total}
        </div>
      </div>

    </div>
  );
}
