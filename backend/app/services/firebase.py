import firebase_admin
from firebase_admin import credentials, db
from ..core.config import settings

def init_firebase():
    if not firebase_admin._apps:
        cred = credentials.Certificate(settings.FIREBASE_CRED_PATH)
        firebase_admin.initialize_app(cred, {"databaseURL": settings.FIREBASE_DB_URL})

def get_db():
    init_firebase()
    return db 

