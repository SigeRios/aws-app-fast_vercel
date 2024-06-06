from fastapi import FastAPI
from mangum import Mangum


app = FastAPI()
handler=Mangum(app)

@app.get("/generate_snipet")
async def generate_snipet_api(prompt:str):
    
    
    return {"Snipet":f"{prompt}"}