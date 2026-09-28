from sqlalchemy.orm import Session
from fastapi import HTTPException,APIRouter,status
from fastapi.params import Depends
from db.database import get_db
from models.course import Course as CourseModel
from schemas.course import Course as CourseSchema
from schemas.session import Session as SessionSchema
from models.session import Session as SessionModel

router = APIRouter(tags=['courses'])

def _check_if_course_exists(course_number : int , db_pipe : Session):
    query = db_pipe.query(CourseModel)
    query = query.filter(CourseModel.number == course_number)
    temp = query.first()
    if temp is not None:
        return temp
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course doesn't exist")

@router.get("/courses",response_model=list[CourseSchema])
def get_courses(db_pipe : Session = Depends(get_db)):
    query = db_pipe.query(CourseModel)
    all_courses = query.all()
    return all_courses

@router.get("/courses/{course_number}", response_model=CourseSchema)
def get_course(course_number : int, db_pipe : Session = Depends(get_db)):
    try:
        cand = _check_if_course_exists(course_number, db_pipe)
        return cand
    except HTTPException as err:
        raise err

@router.post("/courses")
def add_course(course:CourseSchema , db_pipe : Session = Depends(get_db)):
    try:
        if _check_if_course_exists(course.number,db_pipe):
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='Course with this number already exists!')
    finally:
        course_of_type_model = CourseModel(name = course.name,
                                           number=course.number,
                                           faculty=course.faculty
                                           )

        db_pipe.add(course_of_type_model)
        db_pipe.commit()
        db_pipe.refresh(course_of_type_model)




@router.post("/courses/{course_number}/sessions",response_model=SessionSchema)
def add_session(course_number:int,session:SessionSchema,db_pipe:Session = Depends(get_db)):
    course = _check_if_course_exists(course_number,db_pipe)
    lst_sessions = course.sessions

    for session_l in lst_sessions:
        if session_l.type == session.type:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT,detail=f'{session_l.type} type already exists!')

    session_of_type_model = SessionModel(day=session.day,start=session.start,end=session.end,type=session.type,group=session.group,lecturer=session.lecturer,course_id=course.id)
    db_pipe.add(session_of_type_model)
    db_pipe.commit()
    db_pipe.refresh(session_of_type_model)

    return session_of_type_model
