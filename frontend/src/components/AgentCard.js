import React from "react";
import {
  FaDatabase,
  FaCogs,
  FaBrain,
  FaExclamationTriangle,
  FaCheckCircle
} from "react-icons/fa";
import "./agent.css";

const ICONS = {
  ingestion: <FaDatabase size={32} />,
  deterministic: <FaCogs size={32} />,
  llm: <FaBrain size={32} />,
  exception: <FaExclamationTriangle size={32} />,
  final: <FaCheckCircle size={32} />
};

export default function AgentCard({ type, name, status }) {
  return (
    <div className={`agent-node ${status}`}>
      <div className="icon">{ICONS[type]}</div>
      <div className="label">{name}</div>
      <div className="status">{status}</div>
    </div>
  );
}
