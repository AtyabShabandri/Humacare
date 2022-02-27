from pydantic import BaseModel

class Model(BaseModel):
    age : int
    sex : int   
    bmi : float
    children : int  
    smoker : int

     