import React, { useState } from "react";
import "./table.css";

const PAGE_SIZE = 10;

export default function ReconciliationTable({ rows = [] }) {

  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(rows.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const pageRows = rows.slice(start, start + PAGE_SIZE);

  return (
    <div>

      <table>
        <thead>
          <tr>
            <th>Rail</th>
            <th>Source System</th>
            <th>Bank Txn</th>
            <th>Amount</th>
            <th>Invoice</th>
            <th>Payment Ref</th>
            <th>Match Type</th>
            <th>Status</th>
            <th>Exception</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {pageRows.map((r) => (
            <tr
              key={r.bank_statement_id || r.statement_id}
              className={r.decision}
            >
              <td>{r.payment_rail || "UNKNOWN"}</td>
              <td>{r.source_system || "UNKNOWN"}</td>
              <td>{(r.bank_statement_id || r.statement_id || "").slice(0, 8)}</td>
              <td>{r.bank_amount ?? r.amount}</td>
              <td>{r.ledger_invoice_id || "-"}</td>
              <td>{r.payment_reference || "-"}</td>

              {/* MATCH TYPE WITH AI TOOLTIP */}
              <td>
                {r.match_type === "AI" ? (
                  <span className="ai-tooltip-wrapper">
                    AI
                    {/* <span className="ai-tooltip-box">
                      {r.ai_explanation ||
                        "Matched using amount equality and invoice reference similarity."}
                    </span> */}
                      <span className="ai-tooltip-box">
                      <div><b>Confidence:</b> {r.confidence}</div>
                      <div style={{ marginTop: 4 }}>
                        {r.ai_explanation ||
                          "Matched using amount equality and invoice reference similarity."}
                      </div>
                    </span>

                  </span>
                ) : (
                  r.match_type
                )}
              </td>

              <td>{r.decision}</td>
              <td>{r.exception_type}</td>
              <td>{r.recommended_action}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

    </div>
  );
}
