from fastapi import APIRouter, Depends
from app.auth import get_current_user
from app.models import User
import random

router = APIRouter()

@router.get("")
def get_weather(current_user: User = Depends(get_current_user)):
    # Mock weather data - integrate with OpenWeatherMap API in production
    weather_data = {
        "temperature": round(random.uniform(20, 35), 1),
        "humidity": random.randint(40, 90),
        "rainfall": round(random.uniform(0, 50), 1),
        "wind_speed": round(random.uniform(5, 25), 1),
        "condition": "Partly Cloudy",
        "location": "Farm Location"
    }
    return weather_data

