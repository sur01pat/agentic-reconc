import random
import uuid


class IngestionAgent:

    def load_all_sources(self, volume=5000):

        statements = []
        ledger = []

        rails = ["UPI", "CARD", "RTP", "OPEN_BANKING"]
        systems = ["UPI-Switch", "Card-Switch", "Payment-Gateway", "OpenBanking-API"]

        # -------------------------
        # Generate Ledger Invoices
        # -------------------------
        for i in range(volume):
            invoice_id = f"INV-{100000+i}"
            amount = random.choice([100, 250, 500, 750, 1000, 1500])

            ledger.append(
                {
                    "invoice_id": invoice_id,
                    "amount": amount,
                    "customer_id": f"CUST-{random.randint(1, 2000)}",
                }
            )

        # -------------------------
        # Generate Statements
        # -------------------------
        for i in range(volume):

            rail = random.choice(rails)
            system = random.choice(systems)

            invoice = random.choice(ledger)

            # 80% exact match, 20% mismatch
            amount_variation = random.choice([0, 0, 0, 0, 10, -10])

            # 70% deterministic clean invoice
            # 15% AI fuzzy (remove dash)
            # 15% missing invoice
            mode = random.random()

            if mode < 0.70:
                invoice_id = invoice["invoice_id"]  # deterministic
            elif mode < 0.85:
                invoice_id = invoice["invoice_id"].replace("-", "")  # AI fuzzy
            else:
                invoice_id = None  # exception

            statements.append(
                {
                    "statement_id": str(uuid.uuid4()),
                    "invoice_id": invoice_id,  # ✅ CRITICAL FIX
                    "amount": invoice["amount"] + amount_variation,
                    "payment_rail": rail,
                    "source_system": system,
                    "end_to_end_id": f"E2E-{random.randint(100000,999999)}",
                }
            )

        return {"statements": statements, "ledger": ledger}
