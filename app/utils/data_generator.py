import random
import uuid

PAYMENT_RAILS = ["RTP", "UPI", "CARD", "ACH", "OPEN_BANKING"]

SOURCE_SYSTEMS = {
    "RTP": "Payment-Gateway",
    "UPI": "UPI-Switch",
    "CARD": "Card-Switch",
    "ACH": "ACH-Network",
    "OPEN_BANKING": "OpenBanking-API",
}

AMOUNTS = [100, 250, 500, 1000, 1500]

# ======================================================
# LEDGER (Source of Truth)
# ======================================================


def generate_ledger(n=100):

    ledger = []

    for i in range(n):
        ledger.append({"invoice_id": f"INV-{1000+i}", "amount": random.choice(AMOUNTS)})

    return ledger


# ======================================================
# STATEMENTS (Controlled Mix)
# ======================================================


def generate_statements(ledger):

    statements = []

    for i, l in enumerate(ledger):

        rail = random.choice(PAYMENT_RAILS)

        record = {
            "statement_id": str(uuid.uuid4()),
            "amount": l["amount"],
            "invoice_id": l["invoice_id"],
            "end_to_end_id": f"E2E-{10000+i}",
            "payment_rail": rail,
            "source_system": SOURCE_SYSTEMS[rail],
        }

        # -----------------------------
        # Inject Controlled Scenarios
        # -----------------------------

        # 70% → Clean deterministic
        if i < 70:
            pass

        # 15% → AI fuzzy (remove dash)
        elif i < 85:
            record["invoice_id"] = l["invoice_id"].replace("-", "")

        # 10% → Amount mismatch
        elif i < 95:
            record["amount"] += random.choice([25, 50])

        # 5% → Missing invoice
        else:
            record["invoice_id"] = None

        statements.append(record)

    return statements


# ======================================================
# PAYMENTS (Optional)
# ======================================================


def generate_payments(ledger):

    payments = []

    for l in ledger:
        payments.append(
            {
                "payment_id": str(uuid.uuid4()),
                "invoice_id": l["invoice_id"],
                "amount": l["amount"],
            }
        )

    return payments
