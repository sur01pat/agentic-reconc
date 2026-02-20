// // import React, { useEffect, useState } from "react";
// // import { fetchReconciliation, fetchPipelineStatus } from "./api";

// // import AgentPipeline from "./components/AgentPipeline";
// // import ReconciliationTable from "./components/ReconciliationTable";
// // import Tabs from "./components/Tabs";
// // import KPIBar from "./components/KPIBar";
// // import ChartsPanel from "./components/ChartsPanel";
// // import ReconciledVsSettledCard from "./components/ReconciledVsSettledCard";


// // function App() {

// //   const [rows, setRows] = useState([]);
// //   const [activeTab, setActiveTab] = useState("Reconciled");
// //   const [stage, setStage] = useState("idle");
// //   const [loading, setLoading] = useState(true);
// //   //added
// //   const [selectedModel, setSelectedModel] =
// //   useState("amazon.nova-lite-v1:0");

// //   // -------------------------
// //   // LOAD DATA + POLL PIPELINE
// //   // -------------------------
// //   useEffect(() => {

// //     // Start reconciliation job
// //     // fetchReconciliation()
// //     fetchReconciliation(selectedModel)

// //       .then(data => {
// //         setRows(data || []);
// //         setLoading(false);
// //       })
// //       .catch(() => setLoading(false));

// //     // Poll pipeline state
// //     const timer = setInterval(() => {
// //       fetchPipelineStatus()
// //         .then(s => setStage(s.stage))
// //         .catch(() => {});
// //     }, 500);

// //     return () => clearInterval(timer);

// //   }, []);

// //   // -------------------------
// //   // LOGICAL CATEGORIES
// //   // -------------------------

// //   // Any MATCH (AI or Deterministic)
// //   const reconciled = rows.filter(
// //     r => r.decision === "MATCH"
// //   );

// //   // True Exceptions (ONLY driven by exception_type)
// //   const exceptions = rows.filter(
// //     r => r.exception_type && r.exception_type !== "NONE"
// //   );

// //   // Settled = Deterministic auto matches only
// //   const settled = rows.filter(
// //     r =>
// //       r.decision === "MATCH" &&
// //       r.match_type === "DETERMINISTIC"
// //   );

// //   // -------------------------
// //   // TAB DATA
// //   // -------------------------

// //   const dataToShow =
// //     activeTab === "Reconciled" ? reconciled :
// //     activeTab === "Exceptions" ? exceptions :
// //     settled;

// //   // -------------------------
// //   // RENDER
// //   // -------------------------

// //   return (
// //     <div style={{ padding: 12 }}>

// //       {/* <h2 style={{ marginBottom: 12 }}>
// //         Agentic AI Payment Reconciliation Platform
// //       </h2> */}
// //       <h2 style={{ marginBottom: 6 }}>
// //         Agentic AI Payment Reconciliation Platform
// //       </h2>

// //       <div style={{ marginBottom: 12 }}>
// //         <label style={{ fontSize: 13, marginRight: 8 }}>
// //           Nova Model:
// //         </label>

// //   <select
// //     value={selectedModel}
// //     onChange={(e) => setSelectedModel(e.target.value)}
// //   >

// //     {/* ✅ Only supported model */}
// //     <option value="amazon.nova-lite-v1:0">
// //       amazon.nova-lite-v1:0 (Recommended)
// //     </option>

// //     /* <option value="amazon.nova-2-lite-v1:0">
// //       Nova 2 Lite
// //     </option> */

// //      <option value="amazon.nova-2-sonic-v1:0">
// //       Nova 2 Sonic
// //     </option>

// //     <option value="amazon.nova-pro-v1:0">
// //       Nova Pro
// //     </option>

// //     <option value="amazon.nova-2-multimodal-embeddings-v1:0">
// //       Nova Multimodal Embeddings
// //     </option> 
// //   </select>
// // </div>


// //       {/* PIPELINE */}
// //       <AgentPipeline stage={stage} />

// //       {/* LOADING */}
// //       {loading && (
// //         <div style={{ marginTop: 20 }}>
// //           Running reconciliation agents...
// //         </div>
// //       )}

// //       {/* DASHBOARD */}
// //       {!loading && (
// //         <>
// //           <KPIBar
// //             total={rows.length}
// //             reconciled={reconciled.length}
// //             exceptions={exceptions.length}
// //             settled={settled.length}
// //           />


// //           <ChartsPanel rows={rows} />

// //           <Tabs
// //             active={activeTab}
// //             setActive={setActiveTab}
// //             counts={{
// //               Reconciled: reconciled.length,
// //               Exceptions: exceptions.length,
// //               Settled: settled.length
// //             }}
// //           />

// //           <ReconciliationTable rows={dataToShow} />
// //         </>
// //       )}

// //     </div>
// //   );
// // }

// // export default App;

// // import React, { useEffect, useState } from "react";
// // import { fetchReconciliation, fetchPipelineStatus } from "./api";

// // import AgentPipeline from "./components/AgentPipeline";
// // import ReconciliationTable from "./components/ReconciliationTable";
// // import Tabs from "./components/Tabs";
// // import KPIBar from "./components/KPIBar";
// // import ChartsPanel from "./components/ChartsPanel";
// // import ReconciledVsSettledCard from "./components/ReconciledVsSettledCard";


// // function App() {

// //   const [rows, setRows] = useState([]);
// //   const [activeTab, setActiveTab] = useState("Reconciled");
// //   const [stage, setStage] = useState("idle");
// //   const [loading, setLoading] = useState(true);

// //   // added
// //   const [selectedModel, setSelectedModel] =
// //     useState("amazon.nova-lite-v1:0");

// //   // ✅ ADDED: local vs aws toggle
// //   const [runMode, setRunMode] = useState("aws");

// //   // -------------------------
// //   // LOAD DATA + POLL PIPELINE
// //   // -------------------------
// //   useEffect(() => {

// //     // Start reconciliation job
// //     // fetchReconciliation()
// //     fetchReconciliation(selectedModel)

// //       .then(data => {
// //         setRows(data || []);
// //         setLoading(false);
// //       })
// //       .catch(() => setLoading(false));

// //     // Poll pipeline state
// //     const timer = setInterval(() => {
// //       fetchPipelineStatus()
// //         .then(s => setStage(s.stage))
// //         .catch(() => {});
// //     }, 500);

// //     return () => clearInterval(timer);

// //   }, []);

// //   // -------------------------
// //   // LOGICAL CATEGORIES
// //   // -------------------------

// //   // Any MATCH (AI or Deterministic)
// //   const reconciled = rows.filter(
// //     r => r.decision === "MATCH"
// //   );

// //   // True Exceptions (ONLY driven by exception_type)
// //   const exceptions = rows.filter(
// //     r => r.exception_type && r.exception_type !== "NONE"
// //   );

// //   // Settled = Deterministic auto matches only
// //   const settled = rows.filter(
// //     r =>
// //       r.decision === "MATCH" &&
// //       r.match_type === "DETERMINISTIC"
// //   );

// //   // -------------------------
// //   // TAB DATA
// //   // -------------------------

// //   const dataToShow =
// //     activeTab === "Reconciled" ? reconciled :
// //     activeTab === "Exceptions" ? exceptions :
// //     settled;

// //   // -------------------------
// //   // RENDER
// //   // -------------------------

// //   return (
// //     <div style={{ padding: 12 }}>

// //       <h2 style={{ marginBottom: 6 }}>
// //         Agentic AI Payment Reconciliation Platform
// //       </h2>

// //       <div style={{ marginBottom: 12, display: "flex", gap: 20 }}>

// //         {/* EXISTING MODEL DROPDOWN (UNCHANGED) */}
// //         <div>
// //           <label style={{ fontSize: 13, marginRight: 8 }}>
// //             Nova Model:
// //           </label>

// //           <select
// //             value={selectedModel}
// //             onChange={(e) => setSelectedModel(e.target.value)}
// //           >

// //             {/* ✅ Only supported model */}
// //             <option value="amazon.nova-lite-v1:0">
// //               amazon.nova-lite-v1:0 (Recommended)
// //             </option>

// //             {/* <option value="amazon.nova-2-lite-v1:0">
// //               Nova 2 Lite
// //             </option> */}

// //             <option value="amazon.nova-2-sonic-v1:0">
// //               Nova 2 Sonic
// //             </option>

// //             <option value="amazon.nova-pro-v1:0">
// //               Nova Pro
// //             </option>

// //             <option value="amazon.nova-2-multimodal-embeddings-v1:0">
// //               Nova Multimodal Embeddings
// //             </option>

// //           </select>
// //         </div>

// //         {/* ✅ ADDED: LOCAL vs AWS SWITCH */}
// //         <div>
// //           <label style={{ fontSize: 13, marginRight: 8 }}>
// //             Mode:
// //           </label>

// //           <select
// //             value={runMode}
// //             onChange={(e) => setRunMode(e.target.value)}
// //           >
// //             <option value="aws">AWS</option>
// //             <option value="local">Local</option>
// //           </select>
// //         </div>

// //       </div>

// //       {/* PIPELINE */}
// //       <AgentPipeline stage={stage} />

// //       {/* LOADING */}
// //       {loading && (
// //         <div style={{ marginTop: 20 }}>
// //           Running reconciliation agents...
// //         </div>
// //       )}

// //       {/* DASHBOARD */}
// //       {!loading && (
// //         <>
// //           <KPIBar
// //             total={rows.length}
// //             reconciled={reconciled.length}
// //             exceptions={exceptions.length}
// //             settled={settled.length}
// //           />

// //           <ChartsPanel rows={rows} />

// //           <Tabs
// //             active={activeTab}
// //             setActive={setActiveTab}
// //             counts={{
// //               Reconciled: reconciled.length,
// //               Exceptions: exceptions.length,
// //               Settled: settled.length
// //             }}
// //           />

// //           <ReconciliationTable rows={dataToShow} />
// //         </>
// //       )}

// //     </div>
// //   );
// // }

// // export default App;

// // import React, { useEffect, useState } from "react";
// // import { fetchReconciliation, fetchPipelineStatus } from "./api";

// // import AgentPipeline from "./components/AgentPipeline";
// // import ReconciliationTable from "./components/ReconciliationTable";
// // import Tabs from "./components/Tabs";
// // import KPIBar from "./components/KPIBar";
// // import ChartsPanel from "./components/ChartsPanel";
// // import ReconciledVsSettledCard from "./components/ReconciledVsSettledCard";


// // function App() {

// //   const [rows, setRows] = useState([]);
// //   const [activeTab, setActiveTab] = useState("Reconciled");
// //   const [stage, setStage] = useState("idle");
// //   const [loading, setLoading] = useState(true);

// //   // added
// //   const [selectedModel, setSelectedModel] =
// //     useState("amazon.nova-lite-v1:0");

// //   // ✅ ADDED: local vs aws toggle
// //   const [runMode, setRunMode] = useState("aws");

// //   // -------------------------
// //   // LOAD DATA + POLL PIPELINE
// //   // -------------------------
// //   useEffect(() => {

// //     // Start reconciliation job
// //     // fetchReconciliation()
// //     fetchReconciliation(selectedModel)

// //       .then(data => {
// //         setRows(data || []);
// //         setLoading(false);
// //       })
// //       .catch(() => setLoading(false));

// //     // Poll pipeline state
// //     const timer = setInterval(() => {
// //       fetchPipelineStatus()
// //         .then(s => setStage(s.stage))
// //         .catch(() => {});
// //     }, 500);

// //     return () => clearInterval(timer);

// //   }, []);

// //   // -------------------------
// //   // LOGICAL CATEGORIES
// //   // -------------------------

// //   // Any MATCH (AI or Deterministic)
// //   const reconciled = rows.filter(
// //     r => r.decision === "MATCH"
// //   );

// //   // True Exceptions (ONLY driven by exception_type)
// //   const exceptions = rows.filter(
// //     r => r.exception_type && r.exception_type !== "NONE"
// //   );

// //   // Settled = Deterministic auto matches only
// //   const settled = rows.filter(
// //     r =>
// //       r.decision === "MATCH" &&
// //       r.match_type === "DETERMINISTIC"
// //   );

// //   // -------------------------
// //   // TAB DATA
// //   // -------------------------

// //   const dataToShow =
// //     activeTab === "Reconciled" ? reconciled :
// //     activeTab === "Exceptions" ? exceptions :
// //     settled;

// //   // -------------------------
// //   // RENDER
// //   // -------------------------

// //   return (
// //     <div style={{ padding: 12 }}>

// //       <h2 style={{ marginBottom: 6 }}>
// //         Agentic AI Payment Reconciliation Platform
// //       </h2>

// //       <div style={{ marginBottom: 12, display: "flex", gap: 20 }}>

// //         {/* EXISTING MODEL DROPDOWN (UNCHANGED) */}
// //         <div>
// //           <label style={{ fontSize: 13, marginRight: 8 }}>
// //             Nova Model:
// //           </label>

// //           <select
// //             value={selectedModel}
// //             onChange={(e) => setSelectedModel(e.target.value)}
// //           >

// //             {/* ✅ Only supported model */}
// //             <option value="amazon.nova-lite-v1:0">
// //               amazon.nova-lite-v1:0 (Recommended)
// //             </option>

// //             {/* <option value="amazon.nova-2-lite-v1:0">
// //               Nova 2 Lite
// //             </option> */}

// //             <option value="amazon.nova-2-sonic-v1:0">
// //               Nova 2 Sonic
// //             </option>

// //             <option value="amazon.nova-pro-v1:0">
// //               Nova Pro
// //             </option>

// //             <option value="amazon.nova-2-multimodal-embeddings-v1:0">
// //               Nova Multimodal Embeddings
// //             </option>

// //           </select>
// //         </div>

// //         {/* ✅ ADDED: LOCAL vs AWS SWITCH */}
// //         <div>
// //           <label style={{ fontSize: 13, marginRight: 8 }}>
// //             Mode:
// //           </label>

// //           <select
// //             value={runMode}
// //             onChange={(e) => setRunMode(e.target.value)}
// //           >
// //             <option value="aws">AWS</option>
// //             <option value="local">Local</option>
// //           </select>
// //         </div>

// //         {/* ✅ ADDED: RUN RECONCILIATION BUTTON */}
// //         <div>
// //           <button
// //             onClick={() => {
// //               setLoading(true);
// //               fetchReconciliation(selectedModel)
// //                 .then(data => {
// //                   setRows(data || []);
// //                   setLoading(false);
// //                 })
// //                 .catch(() => setLoading(false));
// //             }}
// //           >
// //             Run Reconciliation
// //           </button>
// //         </div>

// //       </div>

// //       {/* PIPELINE */}
// //       <AgentPipeline stage={stage} />

// //       {/* LOADING */}
// //       {loading && (
// //         <div style={{ marginTop: 20 }}>
// //           Running reconciliation agents...
// //         </div>
// //       )}

// //       {/* DASHBOARD */}
// //       {!loading && (
// //         <>
// //           <KPIBar
// //             total={rows.length}
// //             reconciled={reconciled.length}
// //             exceptions={exceptions.length}
// //             settled={settled.length}
// //           />

// //           <ChartsPanel rows={rows} />

// //           <Tabs
// //             active={activeTab}
// //             setActive={setActiveTab}
// //             counts={{
// //               Reconciled: reconciled.length,
// //               Exceptions: exceptions.length,
// //               Settled: settled.length
// //             }}
// //           />

// //           <ReconciliationTable rows={dataToShow} />
// //         </>
// //       )}

// //     </div>
// //   );
// // }

// // export default App;


// //new file

// // import React, { useEffect, useState } from "react";

// // import { fetchReconciliation, fetchPipelineStatus } from "./api";

// // import AgentPipeline from "./components/AgentPipeline";
// // import ReconciliationTable from "./components/ReconciliationTable";
// // import Tabs from "./components/Tabs";
// // import KPIBar from "./components/KPIBar";
// // import ChartsPanel from "./components/ChartsPanel";
// // import ReconciledVsSettledCard from "./components/ReconciledVsSettledCard";


// // function App() {

// //   const [rows, setRows] = useState([]);
// //   const [activeTab, setActiveTab] = useState("Reconciled");
// //   const [stage, setStage] = useState("idle");
// //   const [loading, setLoading] = useState(true);

// //   // added
// //   const [selectedModel, setSelectedModel] =
// //     useState("amazon.nova-lite-v1:0");

// //   // ✅ ADDED: local vs aws toggle
// //   const [runMode, setRunMode] = useState("aws");

// //   // -------------------------
// //   // LOAD DATA + POLL PIPELINE
// //   // -------------------------
// //   useEffect(() => {

// //     // Start reconciliation job
// //     // fetchReconciliation()

// //     // ✅ CHANGED: pass runMode
// //     fetchReconciliation(selectedModel, runMode)

// //       .then(data => {
// //         setRows(data || []);
// //         setLoading(false);
// //       })
// //       .catch(() => setLoading(false));

// //     // Poll pipeline state
// //     const timer = setInterval(() => {
// //       fetchPipelineStatus()
// //         .then(s => setStage(s.stage))
// //         .catch(() => {});
// //     }, 500);

// //     return () => clearInterval(timer);

// //   }, []);

// //   // -------------------------
// //   // LOGICAL CATEGORIES
// //   // -------------------------

// //   // Any MATCH (AI or Deterministic)
// //   const reconciled = rows.filter(
// //     r => r.decision === "MATCH"
// //   );

// //   // True Exceptions (ONLY driven by exception_type)
// //   const exceptions = rows.filter(
// //     r => r.exception_type && r.exception_type !== "NONE"
// //   );

// //   // Settled = Deterministic auto matches only
// //   const settled = rows.filter(
// //     r =>
// //       r.decision === "MATCH" &&
// //       r.match_type === "DETERMINISTIC"
// //   );

// //   // -------------------------
// //   // TAB DATA
// //   // -------------------------

// //   const dataToShow =
// //     activeTab === "Reconciled" ? reconciled :
// //     activeTab === "Exceptions" ? exceptions :
// //     settled;

// //   // -------------------------
// //   // RENDER
// //   // -------------------------

// //   return (
// //     <div style={{ padding: 12 }}>

// //       <h2 style={{ marginBottom: 6 }}>
// //         Agentic AI Payment Reconciliation Platform
// //       </h2>

// //       <div style={{ marginBottom: 12, display: "flex", gap: 20 }}>

// //         {/* EXISTING MODEL DROPDOWN (UNCHANGED) */}
// //         <div>
// //           <label style={{ fontSize: 13, marginRight: 8 }}>
// //             Nova Model:
// //           </label>

// //           <select
// //             value={selectedModel}
// //             onChange={(e) => setSelectedModel(e.target.value)}
// //           >

// //             {/* ✅ Only supported model */}
// //             <option value="amazon.nova-lite-v1:0">
// //               amazon.nova-lite-v1:0 (Recommended)
// //             </option>

// //             {/* <option value="amazon.nova-2-lite-v1:0">
// //               Nova 2 Lite
// //             </option> */}

// //             <option value="amazon.nova-2-sonic-v1:0">
// //               Nova 2 Sonic
// //             </option>

// //             <option value="amazon.nova-pro-v1:0">
// //               Nova Pro
// //             </option>

// //             <option value="amazon.nova-2-multimodal-embeddings-v1:0">
// //               Nova Multimodal Embeddings
// //             </option>

// //           </select>
// //         </div>

// //         {/* ✅ ADDED: LOCAL vs AWS SWITCH */}
// //         <div>
// //           <label style={{ fontSize: 13, marginRight: 8 }}>
// //             Mode:
// //           </label>

// //           <select
// //             value={runMode}
// //             onChange={(e) => setRunMode(e.target.value)}
// //           >
// //             <option value="aws">AWS</option>
// //             <option value="local">Local</option>
// //           </select>
// //         </div>

// //         {/* ✅ ADDED: RUN RECONCILIATION BUTTON */}
// //         <div>
// //           <button
// //             onClick={() => {
// //               setLoading(true);

// //               // ✅ CHANGED: pass runMode
// //               fetchReconciliation(selectedModel, runMode)

// //                 .then(data => {
// //                   setRows(data || []);
// //                   setLoading(false);
// //                 })
// //                 .catch(() => setLoading(false));
// //             }}
// //           >
// //             Run Reconciliation
// //           </button>
// //         </div>

// //       </div>

// //       {/* PIPELINE */}
// //       <AgentPipeline stage={stage} />

// //       {/* LOADING */}
// //       {loading && (
// //         <div style={{ marginTop: 20 }}>
// //           Running reconciliation agents...
// //         </div>
// //       )}

// //       {/* DASHBOARD */}
// //       {!loading && (
// //         <>
// //           <KPIBar
// //             total={rows.length}
// //             reconciled={reconciled.length}
// //             exceptions={exceptions.length}
// //             settled={settled.length}
// //           />

// //           <ChartsPanel rows={rows} />

// //           <Tabs
// //             active={activeTab}
// //             setActive={setActiveTab}
// //             counts={{
// //               Reconciled: reconciled.length,
// //               Exceptions: exceptions.length,
// //               Settled: settled.length
// //             }}
// //           />

// //           <ReconciliationTable rows={dataToShow} />
// //         </>
// //       )}

// //     </div>
// //   );
// // }

// // export default App;

// //new file

// // import React, { useEffect, useState } from "react";
// // import { fetchReconciliation, fetchPipelineStatus } from "./api";

// // import AgentPipeline from "./components/AgentPipeline";
// // import ReconciliationTable from "./components/ReconciliationTable";
// // import Tabs from "./components/Tabs";
// // import KPIBar from "./components/KPIBar";
// // import ChartsPanel from "./components/ChartsPanel";
// // import ReconciledVsSettledCard from "./components/ReconciledVsSettledCard";

// // function App() {

// //   const [rows, setRows] = useState([]);
// //   const [activeTab, setActiveTab] = useState("Reconciled");
// //   const [stage, setStage] = useState("idle");
// //   const [loading, setLoading] = useState(true);

// //   // added
// //   const [selectedModel, setSelectedModel] =
// //     useState("amazon.nova-lite-v1:0");

// //   // ✅ CHANGED: default mode = local
// //   const [runMode, setRunMode] = useState("local");

// //   // -------------------------
// //   // LOAD DATA + POLL PIPELINE
// //   // -------------------------
// //   useEffect(() => {

// //     fetchReconciliation(selectedModel, runMode)
// //       .then(data => {
// //         setRows(data || []);
// //         setLoading(false);
// //       })
// //       .catch(() => setLoading(false));

// //     const timer = setInterval(() => {
// //       fetchPipelineStatus()
// //         .then(s => setStage(s.stage))
// //         .catch(() => {});
// //     }, 500);

// //     return () => clearInterval(timer);

// //   }, []);

// //   // -------------------------
// //   // LOGICAL CATEGORIES
// //   // -------------------------

// //   const reconciled = rows.filter(
// //     r => r.decision === "MATCH"
// //   );

// //   const exceptions = rows.filter(
// //     r => r.exception_type && r.exception_type !== "NONE"
// //   );

// //   const settled = rows.filter(
// //     r =>
// //       r.decision === "MATCH" &&
// //       r.match_type === "DETERMINISTIC"
// //   );

// //   // -------------------------
// //   // TAB DATA
// //   // -------------------------

// //   const dataToShow =
// //     activeTab === "Reconciled" ? reconciled :
// //     activeTab === "Exceptions" ? exceptions :
// //     settled;

// //   // -------------------------
// //   // RENDER
// //   // -------------------------

// //   return (
// //     <div style={{ padding: 12 }}>

// //       <h2 style={{ marginBottom: 6 }}>
// //         Agentic AI Payment Reconciliation Platform
// //       </h2>

// //       <div style={{ marginBottom: 12, display: "flex", gap: 20 }}>

// //         {/* EXISTING MODEL DROPDOWN */}
// //         <div>
// //           <label style={{ fontSize: 13, marginRight: 8 }}>
// //             Nova Model:
// //           </label>

// //           <select
// //             value={selectedModel}
// //             onChange={(e) => setSelectedModel(e.target.value)}
// //           >
// //             <option value="amazon.nova-lite-v1:0">
// //               amazon.nova-lite-v1:0 (Recommended)
// //             </option>
// //           </select>
// //         </div>

// //         {/* ✅ REAL TOGGLE SWITCH (LOCAL ↔ AWS) */}
// //         <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
// //           <label style={{ fontSize: 13 }}>
// //             Local
// //           </label>

// //           <input
// //             type="checkbox"
// //             checked={runMode === "aws"}
// //             onChange={(e) =>
// //               setRunMode(e.target.checked ? "aws" : "local")
// //             }
// //           />

// //           <label style={{ fontSize: 13 }}>
// //             AWS
// //           </label>
// //         </div>

// //         {/* RUN BUTTON */}
// //         <div>
// //           <button
// //             onClick={() => {
// //               setLoading(true);
// //               fetchReconciliation(selectedModel, runMode)
// //                 .then(data => {
// //                   setRows(data || []);
// //                   setLoading(false);
// //                 })
// //                 .catch(() => setLoading(false));
// //             }}
// //           >
// //             Run Reconciliation
// //           </button>
// //         </div>

// //       </div>

// //       {/* PIPELINE */}
// //       <AgentPipeline stage={stage} />

// //       {/* LOADING */}
// //       {loading && (
// //         <div style={{ marginTop: 20 }}>
// //           Running reconciliation agents...
// //         </div>
// //       )}

// //       {/* DASHBOARD */}
// //       {!loading && (
// //         <>
// //           <KPIBar
// //             total={rows.length}
// //             reconciled={reconciled.length}
// //             exceptions={exceptions.length}
// //             settled={settled.length}
// //           />

// //           <ChartsPanel rows={rows} />

// //           <Tabs
// //             active={activeTab}
// //             setActive={setActiveTab}
// //             counts={{
// //               Reconciled: reconciled.length,
// //               Exceptions: exceptions.length,
// //               Settled: settled.length
// //             }}
// //           />

// //           <ReconciliationTable rows={dataToShow} />
// //         </>
// //       )}

// //     </div>
// //   );
// // }

// // export default App;

// //new file

// import React, { useEffect, useState } from "react";
// import { fetchReconciliation, fetchPipelineStatus } from "./api";

// import AgentPipeline from "./components/AgentPipeline";
// import ReconciliationTable from "./components/ReconciliationTable";
// import Tabs from "./components/Tabs";
// import KPIBar from "./components/KPIBar";
// import ChartsPanel from "./components/ChartsPanel";
// // import ReconciledVsSettledCard from "./components/ReconciledVsSettledCard";

// function App() {

//   const [rows, setRows] = useState([]);
//   const [activeTab, setActiveTab] = useState("Reconciled");
//   const [stage, setStage] = useState("idle");
//   const [loading, setLoading] = useState(false);

//   // added
//   const [selectedModel, setSelectedModel] =
//     useState("us.amazon.nova-2-lite-v1:0");

//   // ✅ CHANGED: default mode = local
//   const [runMode, setRunMode] = useState("local");

//   // -------------------------
//   // LOAD DATA + POLL PIPELINE
//   // -------------------------
//   // useEffect(() => {

//   //   fetchReconciliation(selectedModel, runMode)
//   //     .then(data => {
//   //       setRows(data || []);
//   //       setLoading(false);
//   //     })
//   //     .catch(() => setLoading(false));

//   //   const timer = setInterval(() => {
//   //     fetchPipelineStatus()
//   //       .then(s => setStage(s.stage))
//   //       .catch(() => { });
//   //   }, 500);

//   //   return () => clearInterval(timer);

//   // }, []);
//   useEffect(() => {

//     // ONLY poll pipeline status
//     const timer = setInterval(() => {
//       fetchPipelineStatus()
//         .then(s => setStage(s.stage))
//         .catch(() => {});
//     }, 500);

//     return () => clearInterval(timer);

//   }, []);

//   // -------------------------
//   // LOGICAL CATEGORIES
//   // -------------------------

//   const reconciled = rows.filter(
//     r => r.decision === "MATCH"
//   );

//   const exceptions = rows.filter(
//     r => r.exception_type && r.exception_type !== "NONE"
//   );

//   const settled = rows.filter(
//     r =>
//       r.decision === "MATCH" &&
//       r.match_type === "DETERMINISTIC"
//   );

//   // -------------------------
//   // TAB DATA
//   // -------------------------

//   const dataToShow =
//     activeTab === "Reconciled" ? reconciled :
//       activeTab === "Exceptions" ? exceptions :
//         settled;

//   // -------------------------
//   // RENDER
//   // -------------------------

//   return (
//     <div style={{ padding: 12 }}>

//       <h2 style={{ marginBottom: 6 }}>
//         Agentic AI Payment Reconciliation Platform
//       </h2>

//       <div style={{ marginBottom: 12, display: "flex", gap: 20 }}>

//         {/* EXISTING MODEL DROPDOWN */}
//         <div>
//           <label style={{ fontSize: 13, marginRight: 8 }}>
//             Nova Model:
//           </label>

//           <select
//             value={selectedModel}
//             onChange={(e) => setSelectedModel(e.target.value)}
//           >
//             {/* <option value="amazon.nova-lite-v1:0">
//               amazon.nova-lite-v1:0 (Recommended)
//             </option> */}
//             <option value="us.amazon.nova-2-lite-v1:0">
//               Nova 2 Lite(us.amazon.nova-2-lite-v1:0)
//             </option>
//             <option value="amazon.titan-text-premier-v1:0">
//               Nova Premier(amazon.titan-text-premier-v1:0)
//             </option>
//           </select>
//         </div>

//         {/* ✅ UPDATED: Proper slider-style toggle switch */}
//         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//           <span style={{ fontSize: 13 }}>Local</span>

//           {/* ✅ ADDED: Slider switch */}
//           <label style={{
//             position: "relative",
//             display: "inline-block",
//             width: 44,
//             height: 22
//           }}>
//             <input
//               type="checkbox"
//               checked={runMode === "aws"}
//               onChange={(e) =>
//                 setRunMode(e.target.checked ? "aws" : "local")
//               }
//               style={{ opacity: 0, width: 0, height: 0 }}
//             />
//             <span style={{
//               position: "absolute",
//               cursor: "pointer",
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               backgroundColor: runMode === "aws" ? "#4caf50" : "#888",
//               transition: "0.3s",
//               borderRadius: 34
//             }}>
//               <span style={{
//                 position: "absolute",
//                 height: 16,
//                 width: 16,
//                 left: runMode === "aws" ? 22 : 3,
//                 bottom: 3,
//                 backgroundColor: "white",
//                 transition: "0.3s",
//                 borderRadius: "50%"
//               }} />
//             </span>
//           </label>

//           <span style={{ fontSize: 13 }}>AWS</span>
//         </div>

//         {/* RUN BUTTON */}
//         <div>
//           <button
//             onClick={() => {
//               setLoading(true);
//               fetchReconciliation(selectedModel, runMode)
//                 .then(data => {
//                   setRows(data || []);
//                   setLoading(false);
//                 })
//                 .catch(() => setLoading(false));
//             }}
//           >
//             Run Reconciliation
//           </button>
//         </div>

//       </div>

//       {/* PIPELINE */}
//       <AgentPipeline stage={stage} />

//       {/* LOADING */}
//       {loading && (
//         <div style={{ marginTop: 20 }}>
//           Running reconciliation agents...
//         </div>
//       )}

//       {/* DASHBOARD */}
//       {!loading && (
//         <>
//           <KPIBar
//             total={rows.length}
//             reconciled={reconciled.length}
//             exceptions={exceptions.length}
//             settled={settled.length}
//           />

//           <ChartsPanel rows={rows} />

//           <Tabs
//             active={activeTab}
//             setActive={setActiveTab}
//             counts={{
//               Reconciled: reconciled.length,
//               Exceptions: exceptions.length,
//               Settled: settled.length
//             }}
//           />

//           <ReconciliationTable rows={dataToShow} />
//         </>
//       )}

//     </div>
//   );
// }

// // export default App;
// import React, { useEffect, useState } from "react";
// import { fetchReconciliation, fetchPipelineStatus } from "./api";

// import AgentPipeline from "./components/AgentPipeline";
// import ReconciliationTable from "./components/ReconciliationTable";
// import Tabs from "./components/Tabs";
// import KPIBar from "./components/KPIBar";
// import ChartsPanel from "./components/ChartsPanel";
// // import ReconciledVsSettledCard from "./components/ReconciledVsSettledCard";

// // 🔹 ADDED
// import Login from "./Login";

// function App() {

//   // 🔹 ADDED (simple in-memory login state)
//   const [loggedIn, setLoggedIn] = useState(true); // set false if you want login first
//   const [user, setUser] = useState("admin@demo.com");

//   const [rows, setRows] = useState([]);
//   const [activeTab, setActiveTab] = useState("Reconciled");
//   const [stage, setStage] = useState("idle");
//   const [loading, setLoading] = useState(false);

//   // added
//   const [selectedModel, setSelectedModel] =
//     useState("us.amazon.nova-2-lite-v1:0");

//   // ✅ CHANGED: default mode = local
//   const [runMode, setRunMode] = useState("local");

//   // -------------------------
//   // LOAD DATA + POLL PIPELINE
//   // -------------------------

//   useEffect(() => {

//     // ONLY poll pipeline status
//     const timer = setInterval(() => {
//       fetchPipelineStatus()
//         .then(s => setStage(s.stage))
//         .catch(() => {});
//     }, 500);

//     return () => clearInterval(timer);

//   }, []);

//   // -------------------------
//   // LOGICAL CATEGORIES
//   // -------------------------

//   const reconciled = rows.filter(
//     r => r.decision === "MATCH"
//   );

//   const exceptions = rows.filter(
//     r => r.exception_type && r.exception_type !== "NONE"
//   );

//   const settled = rows.filter(
//     r =>
//       r.decision === "MATCH" &&
//       r.match_type === "DETERMINISTIC"
//   );

//   // -------------------------
//   // TAB DATA
//   // -------------------------

//   const dataToShow =
//     activeTab === "Reconciled" ? reconciled :
//       activeTab === "Exceptions" ? exceptions :
//         settled;

//   // -------------------------
//   // 🔹 ADDED: LOGIN GATE
//   // -------------------------

//   if (!loggedIn) {
//     return (
//       <Login onLogin={() => {
//         setLoggedIn(true);
//         setUser("admin@demo.com");
//       }} />
//     );
//   }

//   // -------------------------
//   // RENDER
//   // -------------------------

//   return (
//     <div>

//       {/* 🔹 ADDED: TOP USER BAR */}
//       <div style={{
//         height: 52,
//         background: "#0f172a",
//         color: "white",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//         padding: "0 16px"
//       }}>

//         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//           <div style={{
//             width: 32,
//             height: 32,
//             borderRadius: "50%",
//             background: "#2563eb",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontWeight: "bold"
//           }}>
//             {user.charAt(0).toUpperCase()}
//           </div>

//           <span>{user}</span>
//         </div>

//         <button
//           onClick={() => {
//             setLoggedIn(false);
//             setUser(null);
//           }}
//           style={{
//             background: "#dc2626",
//             color: "white",
//             border: "none",
//             padding: "6px 12px",
//             borderRadius: 4,
//             cursor: "pointer"
//           }}
//         >
//           Logout
//         </button>
//       </div>

//       {/* EXISTING CONTENT (UNCHANGED) */}
//       <div style={{ padding: 12 }}>

//         <h2 style={{ marginBottom: 6 }}>
//           Agentic AI Payment Reconciliation Platform
//         </h2>

//         <div style={{ marginBottom: 12, display: "flex", gap: 20 }}>

//           {/* EXISTING MODEL DROPDOWN */}
//           <div>
//             <label style={{ fontSize: 13, marginRight: 8 }}>
//               Nova Model:
//             </label>

//             <select
//               value={selectedModel}
//               onChange={(e) => setSelectedModel(e.target.value)}
//             >
//               <option value="us.amazon.nova-2-lite-v1:0">
//                 Nova 2 Lite(us.amazon.nova-2-lite-v1:0)
//               </option>
//               <option value="amazon.titan-text-premier-v1:0">
//                 Nova Premier(amazon.titan-text-premier-v1:0)
//               </option>
//             </select>
//           </div>

//           {/* MODE TOGGLE */}
//           <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//             <span style={{ fontSize: 13 }}>Local</span>

//             <label style={{
//               position: "relative",
//               display: "inline-block",
//               width: 44,
//               height: 22
//             }}>
//               <input
//                 type="checkbox"
//                 checked={runMode === "aws"}
//                 onChange={(e) =>
//                   setRunMode(e.target.checked ? "aws" : "local")
//                 }
//                 style={{ opacity: 0, width: 0, height: 0 }}
//               />
//               <span style={{
//                 position: "absolute",
//                 cursor: "pointer",
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 backgroundColor: runMode === "aws" ? "#4caf50" : "#888",
//                 transition: "0.3s",
//                 borderRadius: 34
//               }}>
//                 <span style={{
//                   position: "absolute",
//                   height: 16,
//                   width: 16,
//                   left: runMode === "aws" ? 22 : 3,
//                   bottom: 3,
//                   backgroundColor: "white",
//                   transition: "0.3s",
//                   borderRadius: "50%"
//                 }} />
//               </span>
//             </label>

//             <span style={{ fontSize: 13 }}>AWS</span>
//           </div>

//           {/* RUN BUTTON */}
//           <div>
//             <button
//               onClick={() => {
//                 setLoading(true);
//                 fetchReconciliation(selectedModel, runMode)
//                   .then(data => {
//                     setRows(data || []);
//                     setLoading(false);
//                   })
//                   .catch(() => setLoading(false));
//               }}
//             >
//               Run Reconciliation
//             </button>
//           </div>

//         </div>

//         <AgentPipeline stage={stage} />

//         {loading && (
//           <div style={{ marginTop: 20 }}>
//             Running reconciliation agents...
//           </div>
//         )}

//         {!loading && (
//           <>
//             <KPIBar
//               total={rows.length}
//               reconciled={reconciled.length}
//               exceptions={exceptions.length}
//               settled={settled.length}
//             />

//             <ChartsPanel rows={rows} />

//             <Tabs
//               active={activeTab}
//               setActive={setActiveTab}
//               counts={{
//                 Reconciled: reconciled.length,
//                 Exceptions: exceptions.length,
//                 Settled: settled.length
//               }}
//             />

//             <ReconciliationTable rows={dataToShow} />
//           </>
//         )}

//       </div>

//     </div>
//   );
// }

// export default App;


// import React, { useEffect, useState } from "react";
// import { fetchReconciliation, fetchPipelineStatus } from "./api";

// import AgentPipeline from "./components/AgentPipeline";
// import ReconciliationTable from "./components/ReconciliationTable";
// import Tabs from "./components/Tabs";
// import KPIBar from "./components/KPIBar";
// import ChartsPanel from "./components/ChartsPanel";

// // 🔹 ADDED
// import Login from "./Login";

// function App() {

//   // 🔹 ADDED
//   const [loggedIn, setLoggedIn] = useState(true);
//   const [user, setUser] = useState("admin@demo.com");

//   const [rows, setRows] = useState([]);
//   const [activeTab, setActiveTab] = useState("Reconciled");
//   const [stage, setStage] = useState("idle");
//   const [loading, setLoading] = useState(false);

//   const [selectedModel, setSelectedModel] =
//     useState("us.amazon.nova-2-lite-v1:0");

//   const [runMode, setRunMode] = useState("local");

//   useEffect(() => {
//     const timer = setInterval(() => {
//       fetchPipelineStatus()
//         .then(s => setStage(s.stage))
//         .catch(() => {});
//     }, 500);

//     return () => clearInterval(timer);
//   }, []);

//   const reconciled = rows.filter(
//     r => r.decision === "MATCH"
//   );

//   const exceptions = rows.filter(
//     r => r.exception_type && r.exception_type !== "NONE"
//   );

//   const settled = rows.filter(
//     r =>
//       r.decision === "MATCH" &&
//       r.match_type === "DETERMINISTIC"
//   );

//   const dataToShow =
//     activeTab === "Reconciled" ? reconciled :
//       activeTab === "Exceptions" ? exceptions :
//         settled;

//   // 🔹 ADDED LOGIN GATE
//   if (!loggedIn) {
//     return (
//       <Login onLogin={() => {
//         setLoggedIn(true);
//         setUser("admin@demo.com");
//       }} />
//     );
//   }

//   return (
//     <div style={{ padding: 12 }}>

//       {/* 🔹 ADDED: Floating User + Logout (NO TOP BAR) */}
//       <div style={{
//         position: "fixed",
//         top: 10,
//         left: 10,
//         display: "flex",
//         alignItems: "center",
//         gap: 8,
//         zIndex: 999
//       }}>

//         {/* User Circle */}
//         <div style={{
//           width: 34,
//           height: 34,
//           borderRadius: "50%",
//           background: "#2563eb",
//           color: "white",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           fontWeight: "bold",
//           fontSize: 14
//         }}>
//           {user.charAt(0).toUpperCase()}
//         </div>

//         {/* Logout Icon */}
//         <button
//           onClick={() => {
//             setLoggedIn(false);
//             setUser(null);
//           }}
//           style={{
//             background: "transparent",
//             border: "none",
//             cursor: "pointer",
//             fontSize: 18
//           }}
//           title="Logout"
//         >
//           ⎋
//         </button>
//       </div>

//       <h2 style={{ marginBottom: 6 }}>
//         Agentic AI Payment Reconciliation Platform
//       </h2>

//       <div style={{ marginBottom: 12, display: "flex", gap: 20 }}>

//         <div>
//           <label style={{ fontSize: 13, marginRight: 8 }}>
//             Nova Model:
//           </label>

//           <select
//             value={selectedModel}
//             onChange={(e) => setSelectedModel(e.target.value)}
//           >
//             <option value="us.amazon.nova-2-lite-v1:0">
//               Nova 2 Lite(us.amazon.nova-2-lite-v1:0)
//             </option>
//             <option value="amazon.titan-text-premier-v1:0">
//               Nova Premier(amazon.titan-text-premier-v1:0)
//             </option>
//           </select>
//         </div>

//         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//           <span style={{ fontSize: 13 }}>Local</span>

//           <label style={{
//             position: "relative",
//             display: "inline-block",
//             width: 44,
//             height: 22
//           }}>
//             <input
//               type="checkbox"
//               checked={runMode === "aws"}
//               onChange={(e) =>
//                 setRunMode(e.target.checked ? "aws" : "local")
//               }
//               style={{ opacity: 0, width: 0, height: 0 }}
//             />
//             <span style={{
//               position: "absolute",
//               cursor: "pointer",
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               backgroundColor: runMode === "aws" ? "#4caf50" : "#888",
//               transition: "0.3s",
//               borderRadius: 34
//             }}>
//               <span style={{
//                 position: "absolute",
//                 height: 16,
//                 width: 16,
//                 left: runMode === "aws" ? 22 : 3,
//                 bottom: 3,
//                 backgroundColor: "white",
//                 transition: "0.3s",
//                 borderRadius: "50%"
//               }} />
//             </span>
//           </label>

//           <span style={{ fontSize: 13 }}>AWS</span>
//         </div>

//         <div>
//           <button
//             onClick={() => {
//               setLoading(true);
//               fetchReconciliation(selectedModel, runMode)
//                 .then(data => {
//                   setRows(data || []);
//                   setLoading(false);
//                 })
//                 .catch(() => setLoading(false));
//             }}
//           >
//             Run Reconciliation
//           </button>
//         </div>

//       </div>

//       <AgentPipeline stage={stage} />

//       {loading && (
//         <div style={{ marginTop: 20 }}>
//           Running reconciliation agents...
//         </div>
//       )}

//       {!loading && (
//         <>
//           <KPIBar
//             total={rows.length}
//             reconciled={reconciled.length}
//             exceptions={exceptions.length}
//             settled={settled.length}
//           />

//           <ChartsPanel rows={rows} />

//           <Tabs
//             active={activeTab}
//             setActive={setActiveTab}
//             counts={{
//               Reconciled: reconciled.length,
//               Exceptions: exceptions.length,
//               Settled: settled.length
//             }}
//           />

//           <ReconciliationTable rows={dataToShow} />
//         </>
//       )}

//     </div>
//   );
// }

// export default App;
import React, { useEffect, useState } from "react";
import { fetchReconciliation, fetchPipelineStatus } from "./api";

import AgentPipeline from "./components/AgentPipeline";
import ReconciliationTable from "./components/ReconciliationTable";
import Tabs from "./components/Tabs";
import KPIBar from "./components/KPIBar";
import ChartsPanel from "./components/ChartsPanel";

function App() {

  const [rows, setRows] = useState([]);
  const [activeTab, setActiveTab] = useState("Reconciled");
  const [stage, setStage] = useState("idle");
  const [loading, setLoading] = useState(false);

  const [selectedModel, setSelectedModel] =
    useState("us.amazon.nova-2-lite-v1:0");

  const [runMode, setRunMode] = useState("local");

  useEffect(() => {

    const timer = setInterval(() => {
      fetchPipelineStatus()
        .then(s => setStage(s.stage))
        .catch(() => {});
    }, 500);

    return () => clearInterval(timer);

  }, []);

  const reconciled = rows.filter(r => r.decision === "MATCH");

  const exceptions = rows.filter(
    r => r.exception_type && r.exception_type !== "NONE"
  );

  const settled = rows.filter(
    r => r.decision === "MATCH" &&
      r.match_type === "DETERMINISTIC"
  );

  const dataToShow =
    activeTab === "Reconciled" ? reconciled :
      activeTab === "Exceptions" ? exceptions :
        settled;

  return (
    <div style={{ padding: 12 }}>

      {/* ✅ ADDED: LOGOUT ICON (TOP RIGHT) */}
      <button
        onClick={() => window.location.reload()}
        title="Logout"
        style={{
          position: "fixed",
          top: 12,
          right: 12,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontSize: 20
        }}
      >
        ⎋
      </button>

      <h2 style={{ marginBottom: 6 }}>
        Agentic AI Payment Reconciliation Platform
      </h2>

      <div style={{ marginBottom: 12, display: "flex", gap: 20 }}>

        <div>
          <label style={{ fontSize: 13, marginRight: 8 }}>
            Nova Model:
          </label>

          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
          >
            <option value="us.amazon.nova-2-lite-v1:0">
              Nova 2 Lite(us.amazon.nova-2-lite-v1:0)
            </option>
            <option value="amazon.titan-text-premier-v1:0">
              Nova Premier(amazon.titan-text-premier-v1:0)
            </option>
          </select>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 13 }}>Local</span>

          <label style={{
            position: "relative",
            display: "inline-block",
            width: 44,
            height: 22
          }}>
            <input
              type="checkbox"
              checked={runMode === "aws"}
              onChange={(e) =>
                setRunMode(e.target.checked ? "aws" : "local")
              }
              style={{ opacity: 0 }}
            />

            <span style={{
              position: "absolute",
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: runMode === "aws" ? "#4caf50" : "#888",
              borderRadius: 34
            }}>
              <span style={{
                position: "absolute",
                height: 16,
                width: 16,
                left: runMode === "aws" ? 22 : 3,
                bottom: 3,
                backgroundColor: "white",
                borderRadius: "50%"
              }} />
            </span>
          </label>

          <span style={{ fontSize: 13 }}>AWS</span>
        </div>

        <div>
          <button
            onClick={() => {
              setLoading(true);
              fetchReconciliation(selectedModel, runMode)
                .then(data => {
                  setRows(data || []);
                  setLoading(false);
                })
                .catch(() => setLoading(false));
            }}
          >
            Run Reconciliation
          </button>
        </div>

      </div>

      <AgentPipeline stage={stage} />

      {loading && (
        <div style={{ marginTop: 20 }}>
          Running reconciliation agents...
        </div>
      )}

      {!loading && (
        <>
          <KPIBar
            total={rows.length}
            reconciled={reconciled.length}
            exceptions={exceptions.length}
            settled={settled.length}
          />

          <ChartsPanel rows={rows} />

          <Tabs
            active={activeTab}
            setActive={setActiveTab}
            counts={{
              Reconciled: reconciled.length,
              Exceptions: exceptions.length,
              Settled: settled.length
            }}
          />

          <ReconciliationTable rows={dataToShow} />
        </>
      )}

    </div>
  );
}

export default App;
