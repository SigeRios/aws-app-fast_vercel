from fastapi import FastAPI, Query, HTTPException
from project_py_module import generate_branding_keyword, generate_branding_snippet
from mangum import Mangum
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
handler=Mangum(app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
@app.get("/generate_snipet")
async def generate_snipet_api(prompt:str):
    validate_input_lenght(prompt)
    snippet= generate_branding_snippet(prompt)
    return {"Snipet":f"{snippet}"}

@app.get("/generate_keyword")
async def generate_keyword_api(prompt:str):
    validate_input_lenght(prompt)
    keyword= generate_branding_keyword(prompt)
    return {"KeyWords":f"{keyword}"}

def validate_input_lenght(prompt:str):
    if len(prompt) >30:
        raise HTTPException(status_code=400, detail="Prompt is too long")
