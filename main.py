from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, JSONResponse
from pydantic import BaseModel
import httpx
from httpx import AsyncClient, ASGITransport
import os
from dotenv import load_dotenv


app = FastAPI()
load_dotenv(dotenv_path=".env.production")
RECIPE_API = os.getenv("RECIPE_API")


class SearchParams(BaseModel):
    id: int | None = None
    difficulty: str | None = None
    name: str | None = None
    ingredients: str | None = None
    cuisine: str | None = None
    meal_type: str | None = None
    page: int = 1
    per_page: int = 9

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

homePage = """
<h1>Welcome to the Home Page</h1>
"""
@app.get("/")
async def root():
    return HTMLResponse(homePage)

@app.get("/api")
async def api():
    return {"endpoints": ["/search", "/favorites", "/discover"]}

@app.post("/search")
async def search(params: SearchParams):
    postMessage = {"message": "Search endpoint"}
    print(params)
    print(postMessage)
    if not RECIPE_API:
        print("API key not configured")
        raise HTTPException(status_code=500, detail="API key not configured")

    base_url = "https://recipeapi.io/api/v1/recipes"

    # Use httpx's built-in param handling for a cleaner URL construction
    query_params = {}
    if not params.id:
        if params.difficulty:
            query_params["difficulty"] = params.difficulty
        if params.name:
            query_params["search"] = params.name
        if params.ingredients:
            query_params["ingredients"] = params.ingredients
        if params.cuisine:
            query_params["cuisine"] = params.cuisine
        if params.meal_type:
            query_params["meal_type"] = params.meal_type
        if params.page:
            query_params["page"] = params.page
        if params.per_page:
            query_params["per_page"] = params.per_page

    request_url = f"{base_url}/{params.id}" if params.id else base_url

    try:
        async with AsyncClient(timeout=10.0) as client:
            response = await client.get(
                request_url,
                headers={"Authorization": f"Bearer {RECIPE_API}"},
                params=query_params
            )
            print(response.text)
            response.raise_for_status()
            try:
                response.json()
            except Exception as e:
                print(e)
                raise HTTPException(status_code=500, detail="Recipe service is currently unreachable")
            return response.json()

    except httpx.HTTPStatusError as e:
        # Handle specific API errors
        raise HTTPException(status_code=e.response.status_code, detail=f"API Error: {e.response.text}")
    except httpx.RequestError:
        # Handle network-related errors (timeouts, connection issues)
        raise HTTPException(status_code=503, detail="Recipe service is currently unreachable")
    except Exception as e:
        # Generic fallback
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")

@app.get("/favorites")
async def favorites():
    return {"message": "Favorites endpoint"}

@app.post("/favorites/add/{rec_id}")
async def add_to_favorites(rec_id:int):
    return {"message": f"Added {rec_id} to favorites"}


