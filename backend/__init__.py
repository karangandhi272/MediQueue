from app import app
import os

if not os.path.exists("queue"):
    os.mkdir("backend/queue")