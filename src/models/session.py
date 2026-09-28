from db.database import Base
from sqlalchemy import ForeignKey,Integer,String,Text,Float
from sqlalchemy.orm import Mapped,mapped_column,relationship



class Session(Base):
    __tablename__ = 'sessions'
    id:Mapped[int] = mapped_column(Integer,primary_key=True,index=True,autoincrement=True)
    day:Mapped[int] = mapped_column(Integer)
    start:Mapped[float] = mapped_column(Float)
    end:Mapped[float] = mapped_column(Float)
    type:Mapped[str] = mapped_column(String)
    group:Mapped[str] = mapped_column(String)
    lecturer:Mapped[str] = mapped_column(String)
    

    course_id:Mapped[int] = mapped_column(ForeignKey('courses.id'))
    course:Mapped['Course'] = relationship(back_populates='sessions')
