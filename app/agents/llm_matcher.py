import json
from app.services.bedrock_client import call_llm
# from services.bedrock_client import call_llm


SYSTEM_PROMPT = """
You are an expert payment reconciliation AI agent.

Your job:
1. Determine whether a bank statement entry matches any ledger invoice.
2. Explain WHY deterministic matching failed.
3. Explain WHY this invoice is the best match.

Return ONLY JSON:

{
  "decision": "MATCH" or "NO_MATCH",
  "invoice_id": "string or null",
  "confidence": number between 0 and 1,
  "explanation": "concise business reasoning"
}
"""


# -------------------------------
# LLM MATCHER
# -------------------------------


class LLMMAtcher:

    # ✅ ADDED: mode parameter (aws | local)
    def __init__(self, model_id: str, mode: str = "aws"):
        self.model_id = model_id
        self.mode = mode  # ✅ ADDED

    def match(self, statement: dict, ledger: list) -> dict:

        # ✅ ADDED: short-circuit for local mode (NO AWS CALL)
        if self.mode == "local":

            stmt_amt = statement.get("amount")
            possible_inv = statement.get("possible_invoice")

            # simple local heuristic
            for l in ledger:
                if possible_inv and l.get("invoice_id") == possible_inv:
                    if l.get("amount") == stmt_amt:
                        return {
                            "decision": "MATCH",
                            "invoice_id": l["invoice_id"],
                            "confidence": 0.9,
                            "explanation": "Local mode: invoice_id and amount matched.",
                        }

            return {
                "decision": "NO_MATCH",
                "invoice_id": None,
                "confidence": 0.2,
                "explanation": "Local mode enabled – skipping AWS Bedrock call",
            }

        prompt = f"""
{SYSTEM_PROMPT}

Bank Statement:
{json.dumps(statement, indent=2)}

Ledger:
{json.dumps(ledger, indent=2)}
"""

        # ✅ ADDED: pass selected model to Bedrock
        response = call_llm(prompt, self.model_id)

        try:
            # ✅ ADDED: remove markdown fences if model wraps JSON
            cleaned = response.strip()

            if cleaned.startswith("```"):
                cleaned = cleaned.replace("```json", "")
                cleaned = cleaned.replace("```", "")
                cleaned = cleaned.strip()

            result = json.loads(cleaned)

            return {
                "decision": result.get("decision"),
                "invoice_id": result.get("invoice_id"),
                "confidence": result.get("confidence", 0.5),
                # ✅ ADDED: fallback to "reason" if explanation missing
                "explanation": result.get("explanation") or result.get("reason"),
            }

        except Exception:
            # ✅ ADDED: log raw response for debugging
            print("RAW LLM RESPONSE (UNPARSED):")
            print(response)
            print("--------------")

            return {
                "decision": "NO_MATCH",
                "invoice_id": None,
                "confidence": 0.1,
                "explanation": "Model response could not be parsed",
            }
