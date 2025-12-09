from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.auth import get_current_user
from app.models import User, Storage
from pydantic import BaseModel

router = APIRouter()

class StorageCreate(BaseModel):
    crop_name: str
    quantity: float
    unit: str = "kg"

@router.get("")
def get_storage(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    storage_items = db.query(Storage).filter(Storage.user_id == current_user.id).all()
    return [
        {
            "id": item.id,
            "crop_name": item.crop_name,
            "quantity": item.quantity,
            "unit": item.unit
        }
        for item in storage_items
    ]

@router.post("")
def create_storage(
    request: StorageCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    new_storage = Storage(
        user_id=current_user.id,
        crop_name=request.crop_name,
        quantity=request.quantity,
        unit=request.unit
    )
    db.add(new_storage)
    db.commit()
    db.refresh(new_storage)
    return {"message": "Storage item created", "id": new_storage.id}

