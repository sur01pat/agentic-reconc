//to run locally use this

// ✅ UPDATED: accept both modelId and runMode (aws | local)
export function fetchReconciliation(modelId, runMode) {

  return fetch(
    // ✅ ADDED: pass mode to backend
    `http://localhost:8000/reconcile/all?model_id=${modelId}&mode=${runMode}`
  ).then(r => r.json());
}

export async function fetchPipelineStatus() {
  const res = await fetch("http://127.0.0.1:8000/pipeline/status");
  return res.json();
}


//to run on aws

// const API_BASE =
//   process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

// export function fetchReconciliation(modelId, runMode) {
//   return fetch(
//     `${API_BASE}/reconcile/all?model_id=${modelId}&mode=${runMode}`
//   ).then(r => r.json());
// }

// export async function fetchPipelineStatus() {
//   const res = await fetch(`${API_BASE}/pipeline/status`);
//   return res.json();
// }

