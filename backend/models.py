from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Float
from sqlalchemy import String
from sqlalchemy import DateTime

from datetime import datetime

from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)


class ScanHistory(Base):
    __tablename__ = "scan_history"

    id = Column(Integer, primary_key=True, index=True)

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