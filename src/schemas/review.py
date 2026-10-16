from pydantic import BaseModel,ConfigDict,Field


class ReviewBase(BaseModel):

    content : str = Field(min_length=1)
    course_number : int
    author : str = ''
    rating : int


class ReviewCreate(ReviewBase):         #<---- This defines what we accept
    pass


class ReviewResponse(ReviewBase):       #<---- This defines what we return
    model_config = ConfigDict(from_attributes=True)