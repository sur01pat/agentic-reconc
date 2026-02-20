from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import time
import os

from app.agents.ingestion_agent import IngestionAgent
from app.agents.deterministic_matcher import DeterministicMatcher
from app.agents.llm_matcher import LLMMAtcher
from app.agents.exception_agent import ExceptionAgent

# from agents.ingestion_agent import IngestionAgent
# from agents.deterministic_matcher import DeterministicMatcher
# from agents.llm_matcher import LLMMAtcher
# from agents.exception_agent import ExceptionAgent

app = FastAPI()

PIPELINE_STATE = {"stage": "idle"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------
# PIPELINE STATUS
# -----------------------
@app.get("/pipeline/status")
def pipeline_status():
    return PIPELINE_STATE


# -----------------------
# RECONCILIATION API
# -----------------------
# ✅ ADDED: model_id + mode parameter
@app.get("/reconcile/all")
def reconcile_all(
    model_id: str = "amazon.nova-2-lite-v1:0", mode: str = "aws"  # ✅ ADDED
):
    print("🔍 Using LLM model:", model_id)
    print("🔁 Run mode:", mode)  # ✅ ADDED

    # ✅ ADDED: expose selected model to environment
    os.environ["LLM_MODEL_ID"] = model_id

    global PIPELINE_STATE

    ingest = IngestionAgent()
    matcher = DeterministicMatcher()

    # ✅ ADDED: pass model_id and mode into LLM matcher
    llm = LLMMAtcher(model_id, mode)

    exception_agent = ExceptionAgent()

    # -----------------------
    # INGESTION
    # -----------------------
    PIPELINE_STATE["stage"] = "ingestion"
    time.sleep(0.5)

    data = ingest.load_all_sources(volume=25)

    # -----------------------
    # DETERMINISTIC
    # -----------------------
    PIPELINE_STATE["stage"] = "deterministic"
    time.sleep(0.5)

    det_results = matcher.match(data["statements"], data["ledger"])

    final_results = []
    ai_needed = []
    exception_needed = []

    for det in det_results:

        stmt = next(
            s for s in data["statements"] if s["statement_id"] == det["statement_id"]
        )

        if det["decision"] == "MATCH":
            final_results.append(
                {
                    "bank_statement_id": stmt["statement_id"],
                    "bank_amount": stmt["amount"],
                    "payment_rail": stmt.get("payment_rail"),
                    "source_system": stmt.get("source_system"),
                    "ledger_invoice_id": det.get("invoice_id"),
                    "payment_reference": stmt.get("end_to_end_id"),
                    "match_type": "DETERMINISTIC",
                    "decision": "MATCH",
                    "confidence": 1.0,
                    "exception_type": "NONE",
                    "recommended_action": "Auto-closed",
                }
            )
        else:
            ai_needed.append(stmt)

    print("Total statements:", len(data["statements"]))
    print(
        "Deterministic matches:",
        sum(1 for r in det_results if r["decision"] == "MATCH"),
    )

    # -----------------------
    # AI MATCHING
    # -----------------------
    if ai_needed:
        PIPELINE_STATE["stage"] = "llm"
        time.sleep(0.5)

        for stmt in ai_needed:

            llm_result = llm.match(stmt, data["ledger"])
            matched_invoice = llm_result.get("invoice_id")

            ledger_item = next(
                (l for l in data["ledger"] if l["invoice_id"] == matched_invoice), None
            )

            explanation = llm_result.get("explanation")

            if (
                llm_result.get("decision") == "MATCH"
                and ledger_item
                and stmt.get("amount") == ledger_item.get("amount")
            ):
                final_results.append(
                    {
                        "bank_statement_id": stmt["statement_id"],
                        "bank_amount": stmt["amount"],
                        "payment_rail": stmt.get("payment_rail"),
                        "source_system": stmt.get("source_system"),
                        "ledger_invoice_id": matched_invoice,
                        "payment_reference": stmt.get("end_to_end_id"),
                        "match_type": "AI",
                        "decision": "MATCH",
                        "confidence": llm_result.get("confidence"),
                        "ai_explanation": explanation,
                        "exception_type": "NONE",
                        "recommended_action": "Auto-closed",
                    }
                )
            else:
                exception_needed.append((stmt, llm_result))

    # -----------------------
    # EXCEPTION
    # -----------------------
    if exception_needed:
        PIPELINE_STATE["stage"] = "exception"
        time.sleep(0.5)

        for stmt, llm_result in exception_needed:

            ledger_item = next(
                (
                    l
                    for l in data["ledger"]
                    if l["invoice_id"] == llm_result.get("invoice_id")
                ),
                None,
            )

            exc = exception_agent.analyze(stmt, ledger_item, {}, llm_result)

            final_results.append(
                {
                    "bank_statement_id": stmt["statement_id"],
                    "bank_amount": stmt["amount"],
                    "payment_rail": stmt.get("payment_rail"),
                    "source_system": stmt.get("source_system"),
                    "ledger_invoice_id": llm_result.get("invoice_id"),
                    "payment_reference": stmt.get("end_to_end_id"),
                    "match_type": "AI",
                    "decision": "NO_MATCH",
                    "confidence": llm_result.get("confidence"),
                    "ai_explanation": llm_result.get("explanation"),
                    "exception_type": exc["exception_type"],
                    "recommended_action": exc["recommended_action"],
                }
            )

    # -----------------------
    # COMPLETED
    # -----------------------
    PIPELINE_STATE["stage"] = "completed"
    time.sleep(0.5)

    return final_results
