from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Float
from sqlalchemy import String
from sqlalchemy import DateTime

from datetime import datetime

from database import Base

from sqlalchemy import Column, Integer, String, Float, DateTime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

    age = Column(Integer)
    gender = Column(String)

    height = Column(Float)
    weight = Column(Float)

    smoking = Column(String)
    activity = Column(String)

    conditions = Column(String)


class ScanHistory(Base):
    __tablename__ = "scan_history"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, nullable=False)

    filename = Column(String)
    prediction = Column(String)

    confidence = Column(Float)
    heart_rate = Column(Float)
    risk_score = Column(Float)

    summary = Column(String)

    timestamp = Column(
        DateTime,
        default=datetime.utcnow
    )