from fastapi import FastAPI,HTTPException
from fastapi.params import Depends
from pydantic import BaseModel

import models
from database import get_db
from sqlalchemy.orm import Session

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(CORSMiddleware,
                   allow_origins = ["http://localhost:5173"],
                   allow_credentials = True,
                   allow_methods = ["*"],
                   allow_headers = ["*"]
                   )


#These classes are intended to check that the "input" is correct ( in terms of our web-site )
#That means that the classes that you see in modules.py are not serving the same purpose (they are intended for "telling" the database (the PostgreSQL) how the data should be stored)
class Course(BaseModel):
    course_id : int
    course_name : str

class Review(BaseModel):
    course_id : int
    author : str
    rating : int
    content : str

def _check_if_course_exists(course_id : int , db_pipe : Session):
    query = db_pipe.query(models.Course)
    query = query.filter(models.Course.id == course_id)
    temp = query.first()
    if temp is not None:
        return temp
    raise HTTPException(status_code=404, detail="Course doesn't exist")

@app.get("/courses")
def get_courses(db_pipe : Session = Depends(get_db)):
    query = db_pipe.query(models.Course)
    all_courses = query.all()
    return all_courses

@app.get("/courses/{course_id}")
def get_course(course_id : int , db_pipe : Session = Depends(get_db)):
    try:
        cand = _check_if_course_exists(course_id , db_pipe)
        return cand
    except HTTPException as err:
        raise err

@app.get("/courses/{course_id}/reviews")
def get_course_reviews(course_id: int , db_pipe : Session = Depends(get_db)):
    try:
        _check_if_course_exists(course_id , db_pipe)
        reviews = db_pipe.query(models.Review).filter(models.Review.course_id == course_id).all()
        return reviews
    except HTTPException as err:
        raise err

@app.post("/courses/{course_id}/reviews")
def add_review(course_id: int , review : Review , db_pipe : Session = Depends(get_db)):
    try:
        _check_if_course_exists(course_id, db_pipe)
        review_of_type_model = models.Review(content=review.content ,
                                             course_id=review.course_id,
                                             author=review.author,
                                             rating=review.rating
                                             )


        db_pipe.add(review_of_type_model)
        db_pipe.commit()
        db_pipe.refresh(review_of_type_model)
    except HTTPException as err:
        raise err


@app.post("/courses")
def add_course(course:Course , db_pipe : Session = Depends(get_db)):
    course_of_type_model = models.Course(id = course.course_id , name = course.course_name)

    db_pipe.add(course_of_type_model)
    db_pipe.commit()
    db_pipe.refresh(course_of_type_model)