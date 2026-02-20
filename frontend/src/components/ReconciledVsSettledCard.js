import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#2563eb", "#7c3aed"];

export default function ReconciledVsSettledCard({ rows = [] }) {

  const reconciledRows = rows.filter(
    r => r.decision === "MATCH"
  );

  const settledRows = rows.filter(
    r => r.decision === "MATCH" && r.match_type === "DETERMINISTIC"
  );

  const reconciledValue = reconciledRows.reduce(
    (sum, r) => sum + (r.bank_amount || 0), 0
  );

  const settledValue = settledRows.reduce(
    (sum, r) => sum + (r.bank_amount || 0), 0
  );

  const data = [
    {
      name: "Reconciled",
      value: reconciledRows.length,
      dollars: reconciledValue
    },
    {
      name: "Settled",
      value: settledRows.length,
      dollars: settledValue
    }
  ];

  return (
    <div style={cardStyle}>
      <h4 style={titleStyle}>
        Reconciled vs Settled
      </h4>

      <ResponsiveContainer height={160}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={60}
            innerRadius={40}
          >
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={COLORS[i % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value, name, props) => [
              `${value} | $${props.payload.dollars.toLocaleString()}`,
              name
            ]}
          />
        </PieChart>
      </ResponsiveContainer>

      <div style={{ fontSize: 12, marginTop: 6 }}>
        {data.map((d, i) => (
          <div key={i} style={{ marginBottom: 4 }}>
            {d.name}: {d.value} | $
            {d.dollars.toLocaleString()}
          </div>
        ))}
      </div>
    </div>
  );
}

const cardStyle = {
  border: "1px solid #e5e7eb",
  borderRadius: 8,
  padding: 10,
  background: "#fff",
  height: 260
};

const titleStyle = {
  textAlign: "center",
  marginBottom: 6,
  fontSize: 14,
  fontWeight: 600
};
