import os
import logging
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from api import blueprint

# Load environment variables
load_dotenv()

os.makedirs("data", exist_ok=True)

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)

CORS(app)  # Enable CORS for all routes

# Register the blueprint
app.register_blueprint(blueprint)

if __name__ == "__main__":
    print(app.url_map)  # This prints all registered routes
    app.run(port=5000, debug=True)
