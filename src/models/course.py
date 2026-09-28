from db.database import Base
from sqlalchemy import ForeignKey,Integer,String,Text
from sqlalchemy.orm import Mapped,mapped_column,relationship


class Course(Base):
    __tablename__ = 'courses'
    id:Mapped[int] = mapped_column(Integer,primary_key=True,index=True,autoincrement=True)
    name:Mapped[str] = mapped_column(String)
    number:Mapped[int] = mapped_column(Integer)
    faculty:Mapped[str] = mapped_column(String)

    # This tells SQLAlchemy: "A Course has a list of SessionModels linked to it."
    sessions:Mapped[list['Session']] = relationship(       # <------relationship is SQLAlchemy's magic tool that doesn't create a table in db and acts as a virtual bridge
        back_populates = 'course',      #<----- ensures that both sides of the relationship know about each other
        cascade ='all,delete-orphan'    #<----- if you delete a course from your database, it will automatically delete all its associated sessions too
    )


