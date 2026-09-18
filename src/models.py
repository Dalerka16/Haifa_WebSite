#This module includes SQLAlchemy models
#as we know SQLAlchemy is a "translator" between the server and the the database
#therefore SQLAlchemy models is the way to tell the database how the information and in which format it should be stored

from database import Base
from sqlalchemy import Integer,String,Column,ForeignKey

class Course(Base):
    __tablename__ = 'courses'
    id = Column(Integer,primary_key=True)
    name = Column(String)

class Review(Base):
    __tablename__ = 'reviews'
    id = Column(Integer, primary_key=True)
    content = Column(String)
    course_id = Column(Integer,ForeignKey('courses.id'))
    author = Column(String)
    rating = Column(Integer)