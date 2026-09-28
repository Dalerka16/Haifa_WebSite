from pydantic import BaseModel,ConfigDict
from schemas.session import Session as SessionSchema

class Course(BaseModel):

    name : str
    number:int
    faculty:str
    sessions:list[SessionSchema] = []

    model_config = ConfigDict(from_attributes=True)  # <---- Allows Pydantic to read fields from SQLAlchemy objects


    

     


