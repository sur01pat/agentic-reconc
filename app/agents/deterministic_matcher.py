class DeterministicMatcher:

    def normalize(self, val):
        if not val:
            return None
        return str(val).replace("-", "").replace(" ", "").upper()

    def match(self, statements, ledger):

        results = []

        # ---------------------------------------
        # Pre-index ledger for fast lookup
        # ---------------------------------------
        ledger_by_invoice = {}
        ledger_by_reference = {}
        ledger_by_amount = {}

        for l in ledger:

            inv = self.normalize(l.get("invoice_id"))
            ref = self.normalize(l.get("end_to_end_id") or l.get("payment_reference"))
            amt = l.get("amount")

            if inv:
                ledger_by_invoice.setdefault(inv, []).append(l)

            if ref:
                ledger_by_reference.setdefault(ref, []).append(l)

            if amt is not None:
                ledger_by_amount.setdefault(amt, []).append(l)

        # ---------------------------------------
        # Match each statement
        # ---------------------------------------
        for stmt in statements:

            stmt_id = stmt.get("statement_id")
            stmt_amt = stmt.get("amount")

            stmt_invoice = self.normalize(
                stmt.get("invoice_id") or stmt.get("ledger_invoice_id")
            )

            stmt_ref = self.normalize(
                stmt.get("end_to_end_id") or stmt.get("payment_reference")
            )

            matched_invoice = None

            # ---------------------------------------
            # 1️⃣ Exact Invoice + Amount Match
            # ---------------------------------------
            if stmt_invoice and stmt_invoice in ledger_by_invoice:

                candidates = ledger_by_invoice[stmt_invoice]

                for ledger_item in candidates:
                    if stmt_amt == ledger_item.get("amount"):
                        matched_invoice = ledger_item["invoice_id"]
                        break

            # ---------------------------------------
            # 2️⃣ Exact Reference + Amount Match
            # ---------------------------------------
            if not matched_invoice and stmt_ref and stmt_ref in ledger_by_reference:

                candidates = ledger_by_reference[stmt_ref]

                for ledger_item in candidates:
                    if stmt_amt == ledger_item.get("amount"):
                        matched_invoice = ledger_item["invoice_id"]
                        break

            # ---------------------------------------
            # 3️⃣ Safe Unique Amount Match
            # (Only if exactly ONE ledger entry exists)
            # ---------------------------------------
            if not matched_invoice and stmt_amt in ledger_by_amount:

                candidates = ledger_by_amount[stmt_amt]

                if len(candidates) == 1:
                    matched_invoice = candidates[0]["invoice_id"]

            # ---------------------------------------
            # Final Decision
            # ---------------------------------------
            if matched_invoice:
                results.append(
                    {
                        "statement_id": stmt_id,
                        "decision": "MATCH",
                        "invoice_id": matched_invoice,
                    }
                )
            else:
                results.append(
                    {
                        "statement_id": stmt_id,
                        "decision": "NO_MATCH",
                        "invoice_id": None,
                    }
                )

        return results
