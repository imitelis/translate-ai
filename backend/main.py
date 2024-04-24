# main.py
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
# routers
from routers import translate_router

# Initial params
app = FastAPI(
    title='Translate API',
    description='Translate API project App',
    version='0.8.0',
)

# Configure middleware
app.add_middleware(TrustedHostMiddleware, allowed_hosts=["*"])
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Define a hello route
@app.get("/", tags=["hello"])
def greet_client():
    """
    Greet the client with a friendly message
    """
    return {"message": "Hello from FastAPI!"}


# API Routers
app.include_router(translate_router, prefix="/api", tags=["translate"])

# Start app
if __name__ == '__main__':
    uvicorn.run('main:app', host='0.0.0.0', port=8000,
                reload=True)  # ssl_keyfile="path/to/your/ssl/key.pem", ssl_certfile="path/to/your/ssl/cert.pem"
