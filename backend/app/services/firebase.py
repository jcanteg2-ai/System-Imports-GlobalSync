import firebase_admin
from firebase_admin import credentials, db
from app.core.config import settings

# ✅ Inicializa Firebase solo una vez
def init_firebase():
    if not firebase_admin._apps:
        cred = credentials.Certificate(settings.FIREBASE_CRED_PATH)
        firebase_admin.initialize_app(cred, {"databaseURL": settings.FIREBASE_DB_URL})

def get_db():
    init_firebase()
    return db
