import React, { useEffect, useState } from "react";
import "./agent.css";

const AGENTS = [
  { key: "ingestion", label: "Ingestion Agent", icon: "⬇️" },
  { key: "deterministic", label: "Deterministic Matching Agent", icon: "⚙️" },
  { key: "llm", label: "AI Matching Agent", icon: "🧠" },
  { key: "exception", label: "Exception Agent", icon: "⚠️" },
  { key: "completed", label: "Output Agent", icon: "✔️" }
];

export default function AgentPipeline({ stage }) {

  const [timers, setTimers] = useState({});
  const [activeStage, setActiveStage] = useState(null);
  const [activeStart, setActiveStart] = useState(null);

  // -----------------------------------
  // Track stage transitions
  // -----------------------------------
  useEffect(() => {

    if (!stage) return;

    // Close previous stage
    if (activeStage && activeStart && stage !== activeStage) {
      const elapsed = (Date.now() - activeStart) / 1000;

      setTimers(t => ({
        ...t,
        [activeStage]: elapsed.toFixed(1)
      }));
    }

    // Start new stage
    if (stage !== activeStage) {
      setActiveStage(stage);
      setActiveStart(Date.now());
    }

  }, [stage,activeStage, activeStart]);

  // -----------------------------------
  // FINALIZE when completed
  // -----------------------------------
  useEffect(() => {

    if (stage === "completed" && activeStage && activeStart) {

      const elapsed = (Date.now() - activeStart) / 1000;

      setTimers(t => ({
        ...t,
        completed: elapsed.toFixed(1)
      }));

      setActiveStage(null);
      setActiveStart(null);
    }

  }, [stage, activeStage, activeStart]);

  const stageIndex =
    AGENTS.findIndex(a => a.key === stage);

  // -----------------------------------
  // Render
  // -----------------------------------
  return (
    <div className="pipeline">

      {AGENTS.map((agent, i) => {

        let state = "waiting";

        if (stage === "completed") {
          state = "done";
        } else if (i < stageIndex) {
          state = "done";
        } else if (i === stageIndex) {
          state = "running";
        }

        const time = timers[agent.key];

        return (
          <div key={agent.key} className="stage">

            <div className={`node ${state}`}>
              <span className="icon">{agent.icon}</span>
            </div>

            <div className="label">
              {agent.label}

              <div style={{ fontSize: 11, color: "#555" }}>
                {time && `${time}s `}
                {state === "running" && "running..."}
                {state === "done" && "done"}
              </div>
            </div>

            {i < AGENTS.length - 1 && (
              <div className="arrow">→</div>
            )}

          </div>
        );
      })}

    </div>
  );
}




