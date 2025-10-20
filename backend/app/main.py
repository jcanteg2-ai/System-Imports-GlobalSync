# app/main.py
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from dotenv import load_dotenv
import os

# --- Cargar variables de entorno (.env en la carpeta backend) ---
load_dotenv()
FIREBASE_DB_URL = (os.getenv("FIREBASE_DB_URL") or "").rstrip("/")
FIREBASE_CRED_PATH = os.getenv("FIREBASE_CRED_PATH") or "sistema-importaciones.json"
CORS_ORIGINS = [s.strip() for s in (os.getenv("CORS_ORIGINS") or "http://localhost:4200,http://127.0.0.1:4200").split(",") if s.strip()]

# --- Inicializar FastAPI ---
app = FastAPI(title="Prueba Rápida – FastAPI + Firebase RTDB")

# --- CORS (para que Angular en 4200 pueda llamar a la API) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200", "http://127.0.0.1:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Firebase Admin SDK ---
#   * No subas tu JSON de credenciales a git *
firebase_ready = False
try:
    import firebase_admin
    from firebase_admin import credentials, db

    if not firebase_admin._apps:
        if not FIREBASE_DB_URL:
            raise RuntimeError("FIREBASE_DB_URL no está definido en .env")
        if not os.path.exists(FIREBASE_CRED_PATH):
            raise RuntimeError(f"No existe el archivo de credenciales: {FIREBASE_CRED_PATH}")

        cred = credentials.Certificate(FIREBASE_CRED_PATH)
        firebase_admin.initialize_app(cred, {"databaseURL": FIREBASE_DB_URL})
    firebase_ready = True
except Exception as e:
    # No detengo el servidor para que puedas ver /healthz y diagnosticar
    print(f"[WARN] Firebase no inicializado: {e}")

from app.routers import shipments  # 👈 importa tu archivo de rutas

app.include_router(shipments.router)  # 👈 registra el router


# ------------------ Rutas de prueba ------------------

@app.get("/", include_in_schema=False)
def root():
    # redirige a la documentación
    return RedirectResponse(url="/docs")

@app.get("/healthz")
def healthz():
    return {
        "status": "ok",
        "firebase_ready": firebase_ready,
        "db_url": FIREBASE_DB_URL or "(no configurado)",
        "cred_path": FIREBASE_CRED_PATH or "(no configurado)",
        "cors_origins": CORS_ORIGINS,
    }

@app.post("/dev/write")
def dev_write(key: str = Query("ping"), value: str = Query("pong")):
    """
    Escribe {value: <valor>} en /dev/<key> en la Realtime Database.
    """
    if not firebase_ready:
        raise HTTPException(500, "Firebase no está inicializado. Revisa FIREBASE_DB_URL/FIREBASE_CRED_PATH en .env.")
    try:
        ref = db.reference("dev").child(key)
        ref.set({"value": value})
        return {"ok": True, "path": f"/dev/{key}", "written": {"value": value}}
    except Exception as e:
        raise HTTPException(500, f"Error escribiendo en RTDB: {e}")

@app.get("/dev/read")
def dev_read(key: str = Query("ping")):
    """
    Lee el contenido de /dev/<key> en la Realtime Database.
    """
    if not firebase_ready:
        raise HTTPException(500, "Firebase no está inicializado. Revisa FIREBASE_DB_URL/FIREBASE_CRED_PATH en .env.")
    try:
        data = db.reference("dev").child(key).get()
        return {"ok": True, "key": key, "data": data}
    except Exception as e:
        raise HTTPException(500, f"Error leyendo de RTDB: {e}")

