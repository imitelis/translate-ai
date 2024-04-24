from backend.main import app
from fastapi.testclient import TestClient

client = TestClient(app)


def test_translate_routes():
    response = client.get("/api/translate/deepl?text=Hola%20mundo")
    assert response.status_code == 200
    assert response.json() == "Hello world"

    response = client.get("/api/translate/geminia?text=Hola%20mundo")
    assert response.status_code == 200
    assert response.json() in ["Hello world", "Hello, world", "Hello, world!"]


def test_greet_client():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello from FastAPI!"}

