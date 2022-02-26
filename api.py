import uvicorn
from fastapi import FastAPI
from model import Model
import numpy as np
import pickle
import pandas as pd

#initialize app
app = FastAPI()

#import model
import pickle
pickle_in = open('model.pkl', 'rb')
model = pickle.load(pickle_in)

#routes
@app.post('/predict/')
def predict_insurance(data:Model):
    data = data.dict()
    age = data['age']
    sex = data['sex']
    bmi = data['bmi']
    children = data['children']
    smoker = data['smoker']

    prediction = model.predict([[age,sex,bmi,children,smoker]])
    return {
         'prediction': prediction[0]
    }

@app.get('/')
def index():
    return {"text": "Hello"}

#if __name__ == '__main__':
 #   uvicorn.run(app,host="127.0.0.1",port=8000)
    
#use this to run --  uvicorn app:app --reload