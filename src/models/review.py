from db.database import Base
from sqlalchemy import ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship


class Review(Base):
    __tablename__ = 'reviews'
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True, autoincrement=True)
    content: Mapped[str] = mapped_column(String)
    course_number: Mapped[int] = mapped_column(Integer)
    author: Mapped[str] = mapped_column(String)
    rating: Mapped[int] = mapped_column(Integer)
