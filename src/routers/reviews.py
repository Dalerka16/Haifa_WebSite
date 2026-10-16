from fastapi.params import Depends
from sqlalchemy.orm import Session
from db.database import get_db
from .courses import _check_if_course_exists
from fastapi import HTTPException,APIRouter
from models.review import Review as ReviewModel
from schemas.review import ReviewResponse,ReviewCreate

router = APIRouter(tags=['reviews'])


@router.get("/courses/{course_number}/reviews", response_model=list[ReviewResponse])
def get_course_reviews(course_number: int, db_pipe : Session = Depends(get_db)):
    try:
        _check_if_course_exists(course_number, db_pipe)
        reviews = db_pipe.query(ReviewModel).filter(ReviewModel.course_number == course_number).all()
        return reviews
    except HTTPException as err:
        raise err

@router.post("/courses/{course_id}/reviews")
def add_review(course_id: int , review : ReviewCreate , db_pipe : Session = Depends(get_db)):
    try:
        _check_if_course_exists(course_id, db_pipe)
        review_of_type_model = ReviewModel(content=review.content,
                                           course_number=review.course_number,
                                           author=review.author,
                                           rating=review.rating
                                           )


        db_pipe.add(review_of_type_model)
        db_pipe.commit()
        db_pipe.refresh(review_of_type_model)
    except HTTPException as err:
        raise err