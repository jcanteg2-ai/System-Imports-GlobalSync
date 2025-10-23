from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
import uuid
import random
import string

from app.services.firebase import get_db

router = APIRouter(prefix="/shipments", tags=["Shipments"])

# ==========================================
# 🧱 MODELO Pydantic
# ==========================================
class Shipment(BaseModel):
    id: Optional[str] = None
    tracking_number: Optional[str] = None
    client: str
    type: str
    weight: float
    dimensions: str
    destination: str
    description: Optional[str] = ""
    cost: float
    status: str

    # ✅ Nuevos campos de destinatario
    receiver_name: str
    receiver_phone: str
    receiver_email: EmailStr
    receiver_address: str

    created_at: Optional[str] = None


# ==========================================
# 🔹 Generar tracking number
# ==========================================
def generate_tracking_number() -> str:
    random_digits = ''.join(random.choices(string.digits, k=6))
    return f"GSX-{random_digits}"


# ==========================================
# 🚀 Crear un nuevo envío
# ==========================================
@router.post("/", response_model=Shipment)
def create_shipment(shipment: Shipment):
    db = get_db()
    ref = db.reference("shipments")

    shipment_id = str(uuid.uuid4())
    tracking = generate_tracking_number()
    created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    payload = shipment.model_copy(update={
        "id": shipment_id,
        "tracking_number": tracking,
        "created_at": created_at
    }).model_dump()

    ref.child(shipment_id).set(payload)

    return payload
