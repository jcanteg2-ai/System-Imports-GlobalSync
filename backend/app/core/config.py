# backend/app/core/config.py
from functools import lru_cache
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "Sistema Importaciones API"
    ENV: str = "dev"

    # Firebase
    FIREBASE_CRED_PATH: str = "Examen.json"
    FIREBASE_DB_URL: str

    class Config:
        env_file = ".env"
        extra = "ignore"


@lru_cache
def get_settings() -> Settings:
    return Settings()


# << ESTA VARIABLE ES LA QUE IMPORTA main.py >>
settings = get_settings()

