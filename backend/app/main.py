from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routes import auth_routes, weather_routes, storage_routes

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AgriCloud API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_routes.router, prefix="/api/auth", tags=["auth"])
app.include_router(weather_routes.router, prefix="/api/weather", tags=["weather"])
app.include_router(storage_routes.router, prefix="/api/storage", tags=["storage"])

@app.get("/")
def read_root():
    return {"message": "AgriCloud API - Weather & Storage Platform"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

