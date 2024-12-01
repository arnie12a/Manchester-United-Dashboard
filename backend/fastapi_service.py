from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import os

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app's origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Base directories for CSV files
BASE_DIR = "data"
PLAYER_DIR = os.path.join(BASE_DIR, "seasonPlayerData")
TEAM_DIR = os.path.join(BASE_DIR, "seasonTeamData")

# Helper function to load player data
def load_player_csv(season: str, column: str):
    season_increment = int(season) + 1
    file_path = os.path.join(PLAYER_DIR, f"ManchesterUnited{season}-{season_increment}.csv")
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail=f"File {season} not found in {PLAYER_DIR}")
    df = pd.read_csv(file_path)
    
    return {"message": df[column].to_list()}



# Helper function to load team data
def load_team_csv(season: str, column: str):
    season_increment = int(season) + 1
    file_path = os.path.join(TEAM_DIR, f"{season}-{season_increment}.csv")
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail=f"File {season} not found in {TEAM_DIR}")
    df = pd.read_csv(file_path)
    
    return {"message": df[column].to_list()}

@app.get("/query")
def query_data(season: str, data_type: str, column: str):
    print(season, data_type)
    if data_type == "player":
        data = load_player_csv(season, column)
    elif data_type == "team":
        data = load_team_csv(season, column)
    else:
        raise HTTPException(status_code=400, detail="Invalid type. Use 'player' or 'team'.")


    return data

@app.get("/hello")
def read_hello():
    return {"message": "Hello, World!"}