from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
import uuid

from app.services.firebase import get_db

router = APIRouter(prefix="/shipments", tags=["Shipments"])


# 🧩 Modelo Pydantic
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
    created_at: Optional[str] = None


# 🧾 Obtener todos los envíos
@router.get("/", response_model=List[Shipment])
def get_shipments():
    db = get_db()
    data = db.reference("shipments").get()
    if not data:
        return []
    # Firebase guarda dicts; conviértelos a lista
    return list(data.values())


# 🚀 Crear un nuevo envío (responde correctamente a Angular)
@router.post("/", response_model=dict)
def create_shipment(shipment: Shipment):
    db = get_db()
    ref = db.reference("shipments")

    shipment_id = str(uuid.uuid4())
    tracking = f"GSX-{datetime.now().strftime('%Y%m%d%H%M%S')}"
    created_at = datetime.now().isoformat()

    payload = shipment.model_copy(update={
        "id": shipment_id,
        "tracking_number": tracking,
        "created_at": created_at
    }).model_dump()

    ref.child(shipment_id).set(payload)

    # ✅ devolvemos un JSON estándar (no JSONResponse)
    return {
        "message": "Envío registrado con éxito",
        "tracking_number": tracking,
        "data": payload
    }


    # ✅ Respuesta garantizada con encabezado JSON correcto
    return JSONResponse(
        content={
            "message": "Envío registrado con éxito",
            "tracking_number": tracking,
            "data": payload
        },
        status_code=200
    )


# 🔄 Actualizar un envío
@router.put("/{shipment_id}", response_model=Shipment)
def update_shipment(shipment_id: str, updated: Shipment):
    db = get_db()
    ref = db.reference(f"shipments/{shipment_id}")

    if not ref.get():
        raise HTTPException(status_code=404, detail="Envío no encontrado")

    payload = updated.model_copy(update={"id": shipment_id}).model_dump()
    ref.update(payload)

    return payload


# 🗑️ Eliminar un envío
@router.delete("/{shipment_id}")
def delete_shipment(shipment_id: str):
    db = get_db()
    ref = db.reference(f"shipments/{shipment_id}")

    if not ref.get():
        raise HTTPException(status_code=404, detail="Envío no encontrado")

    ref.delete()

    return JSONResponse(
        content={"message": "Envío eliminado correctamente", "id": shipment_id},
        status_code=200
    )
