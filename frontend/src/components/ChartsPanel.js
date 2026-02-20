import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#2563eb", "#7c3aed", "#0ea5e9", "#f59e0b", "#22c55e"];

export default function ChartsPanel({ rows }) {

  const total = rows.length;

  // =============================
  // MATCHING STRATEGY
  // =============================

  const deterministicRows = rows.filter(
    r => r.match_type === "DETERMINISTIC"
  );

  const aiRows = rows.filter(
    r => r.match_type === "AI"
  );

  const deterministicValue = deterministicRows.reduce(
    (sum, r) => sum + (r.bank_amount || 0), 0
  );

  const aiValue = aiRows.reduce(
    (sum, r) => sum + (r.bank_amount || 0), 0
  );

  const strategyData = [
    {
      name: "Deterministic",
      value: deterministicRows.length,
      dollars: deterministicValue
    },
    {
      name: "AI Assisted",
      value: aiRows.length,
      dollars: aiValue
    }
  ];

  // =============================
  // RECONCILIATION OUTCOME
  // =============================

  const reconciledRows = rows.filter(
    r => r.decision === "MATCH" && r.exception_type === "NONE"
  );

  const exceptionRows = rows.filter(
    r => r.exception_type !== "NONE"
  );

  const reconciledValue = reconciledRows.reduce(
    (sum, r) => sum + (r.bank_amount || 0), 0
  );

  const exceptionValue = exceptionRows.reduce(
    (sum, r) => sum + (r.bank_amount || 0), 0
  );

  const outcomeData = [
    {
      name: "Reconciled",
      value: reconciledRows.length,
      dollars: reconciledValue
    },
    {
      name: "Exceptions",
      value: exceptionRows.length,
      dollars: exceptionValue
    }
  ];

  // =============================
  // EXCEPTION TYPES (NOW RAIL-WISE)
  // =============================

  const exceptionRailCounts = {};

  exceptionRows.forEach(r => {
    const rail = r.payment_rail || "UNKNOWN";
    exceptionRailCounts[rail] =
      (exceptionRailCounts[rail] || 0) + 1;
  });

  const exceptionData = Object.keys(exceptionRailCounts).map(k => ({
    name: k,
    value: exceptionRailCounts[k]
  }));

  // =============================
  // PAYMENT RAIL DISTRIBUTION
  // =============================

  const railCounts = {};
  rows.forEach(r => {
    if (r.payment_rail) {
      railCounts[r.payment_rail] =
        (railCounts[r.payment_rail] || 0) + 1;
    }
  });

  const railData = Object.keys(railCounts).map(k => ({
    name: k,
    value: railCounts[k]
  }));

  // =============================
  // SETTLED AMOUNT BY RAIL ($)
  // =============================

  const settledRailMap = {};
  reconciledRows.forEach(r => {
    settledRailMap[r.payment_rail] =
      (settledRailMap[r.payment_rail] || 0) + (r.bank_amount || 0);
  });

  const settledByRailData = Object.keys(settledRailMap).map(k => ({
    name: k,
    value: settledRailMap[k]
  }));

  // =============================
  // TOP SETTLED INVOICES ($)
  // =============================

  const settledInvoiceMap = {};
  reconciledRows.forEach(r => {
    settledInvoiceMap[r.ledger_invoice_id] =
      (settledInvoiceMap[r.ledger_invoice_id] || 0) + (r.bank_amount || 0);
  });

  const topInvoicesData = Object.entries(settledInvoiceMap)
    .map(([k, v]) => ({ name: k, value: v }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  // =============================
  // RENDER
  // =============================

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 16,
        marginBottom: 20
      }}
    >

      <ChartCard title="Matching Strategy Distribution">
        <PieWithLegend data={strategyData} total={total} />
      </ChartCard>

      <ChartCard title="Reconciliation Outcome">
        <PieWithLegend data={outcomeData} total={total} />
      </ChartCard>

      <ChartCard title="Exception Types">
        <PieWithLegend
          data={exceptionData}
          total={exceptionRows.length}
        />
      </ChartCard>

      <ChartCard title="Payment Rail Distribution">
        <BarChartWrapper data={railData} />
      </ChartCard>

      <ChartCard title="Settled Amount by Payment Rail ($)">
        <BarChartWrapper data={settledByRailData} money />
      </ChartCard>

      <ChartCard title="Top Settled Invoices ($)">
        <BarChartWrapper data={topInvoicesData} money />
      </ChartCard>

    </div>
  );
}

/* ============================= */
/* PIE WITH LEGEND */
/* ============================= */

function PieWithLegend({ data, total }) {

  return (
    <div style={{ width: "100%", height: "100%" }}>

      <ResponsiveContainer height={140}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={60}
            innerRadius={35}
            labelLine={false}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>

          {/* ✅ TOOLTIP WITH $ */}
          <Tooltip
            formatter={(value, name, props) => {
              const dollars = props?.payload?.dollars;
              return dollars !== undefined
                ? [`${value} | $${dollars.toLocaleString()}`, name]
                : [value, name];
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* ✅ LEGEND WITH % AND $ */}
      <div style={{ marginTop: 6 }}>
        {data.map((d, i) => {

          const pct = total
            ? Math.round((d.value / total) * 100)
            : 0;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 12,
                marginBottom: 4
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  background: COLORS[i % COLORS.length],
                  borderRadius: "50%",
                  marginRight: 6
                }}
              />

              <span style={{ flex: 1 }}>
                {d.name}
              </span>

              <span>
                {d.value} ({pct}%)
                {d.dollars !== undefined &&
                  `  $${d.dollars.toLocaleString()}`}
              </span>
            </div>
          );
        })}
      </div>

    </div>
  );
}


/* ============================= */
/* BAR CHART */
/* ============================= */

function BarChartWrapper({ data, money }) {
  return (
    <ResponsiveContainer>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(v) =>
          money ? `$${v.toLocaleString()}` : v
        }/>
        <Bar dataKey="value" fill="#2563eb" />
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ============================= */
/* CARD STYLES */
/* ============================= */

function ChartCard({ title, children }) {
  return (
    <div style={cardStyle}>
      <h4 style={titleStyle}>{title}</h4>
      <div style={chartBox}>{children}</div>
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

const chartBox = {
  width: "100%",
  height: 200
};

const titleStyle = {
  textAlign: "center",
  marginBottom: 6,
  fontSize: 14,
  fontWeight: 600
};
