from pydantic import BaseModel,ConfigDict

class Session(BaseModel):
    day:int
    start: float
    end: float
    type: str
    group: str
    lecturer: str

    model_config = ConfigDict(from_attributes=True)
