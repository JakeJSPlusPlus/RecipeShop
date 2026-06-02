from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, JSONResponse
from pydantic import BaseModel
import requests
from urllib.parse import quote
import os
from dotenv import load_dotenv
app = FastAPI()
load_dotenv(dotenv_path=".env.production")

origins = ["localhost",
           "127.0.0.1",
           "http://localhost",
           "http://127.0.0.1",
           "http://localhost:3000",
           "http://127.0.0.1:3000",
           "https://recipe-app-2024.vercel.app",
           "https://recipe-app-2024.vercel.app/"
           ]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

RECIPE_API = os.getenv("RECIPE_API")

homePage = """
<h1>Welcome to the Home Page</h1>
"""
class SearchParams(BaseModel):
    id: int | None = None
    difficulty: str | None = None
    name: str | None = None
    ingredients: str | None = None
    cuisine: str | None = None
    meal_type: str | None = None
    page: int = 1

@app.get("/")
async def root():
    return HTMLResponse(homePage)

@app.get("/api")
async def api():
    return {"endpoints": ["/search", "/favorites", "/discover"]}

@app.post("/search")
async def search(params: SearchParams):

    build_url = "https://recipeapi.io/api/v1/recipes"
    if params.id:
        build_url += f"/{params.id}"
    else:
        build_url += "?"
        if params.difficulty:
            build_url += f"difficulty={params.difficulty}&"
        if params.name:
            build_url += f"search={params.name}&"
        if params.ingredients:
            build_url += f"ingredients={params.ingredients}&"
        if params.cuisine:
            build_url += f"cuisine={params.cuisine}&"

    encoded_url = quote(build_url, safe="/:=?&")
    print(encoded_url)
    response = requests.get(
        encoded_url,
        headers={"Authorization": f"Bearer {RECIPE_API}"}
    ).json()
    print(response)

    return JSONResponse(content=response, status_code=200, headers={"Content-Type": "application/json"})

@app.get("/favorites")
async def favorites():
    return {"message": "Favorites endpoint"}

@app.get("/discover")
async def discover():
    res_serv = 6.0
    servings = 10.0
    initial_servings = res_serv
    res_serv = servings
    multiplier = servings / res_serv
    print(f"initial: {initial_servings} preferred: {servings} multiplier: {multiplier}")

    return {"message": "Discover endpoint"}

@app.post("/favorites/add/{rec_id}")
async def add_to_favorites(rec_id:int):
    return {"message": f"Added {rec_id} to favorites"}


if __name__ == "__main__":
    a =10
    b= 6
    c = a/b
    print (f"c={c}")
