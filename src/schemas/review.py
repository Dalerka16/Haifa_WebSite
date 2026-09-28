from pydantic import BaseModel,ConfigDict


class Review(BaseModel):

    content : str
    course_number : int
    author : str
    rating : int

    model_config = ConfigDict(from_attributes=True)