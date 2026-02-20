class ExceptionAgent:
    """
    Classifies reconciliation breaks and proposes action
    """

    def analyze(self, stmt, ledger_item, det_result, llm_result):

        # -------------------------
        # Missing invoice
        # -------------------------
        if stmt.get("invoice_id") is None:
            return {
                "exception_type": "MISSING_INVOICE",
                "recommended_action": "Contact source system to obtain invoice reference",
            }

        # -------------------------
        # No ledger record
        # -------------------------
        if ledger_item is None:
            return {
                "exception_type": "LEDGER_NOT_FOUND",
                "recommended_action": "Investigate why invoice does not exist in ledger",
            }

        # -------------------------
        # Amount mismatch
        # -------------------------
        if stmt.get("amount") != ledger_item.get("amount"):
            return {
                "exception_type": "AMOUNT_MISMATCH",
                "recommended_action": "Verify bank amount vs ledger amount",
            }

        # -------------------------
        # Duplicate invoice
        # -------------------------
        if det_result.get("invoice_id") is None and llm_result.get("invoice_id"):
            return {
                "exception_type": "DUPLICATE_INVOICE",
                "recommended_action": "Check for duplicate posting of same invoice",
            }

        # -------------------------
        # Fallback
        # -------------------------
        return {
            "exception_type": "UNCLASSIFIED",
            "recommended_action": "Manual investigation required",
        }
