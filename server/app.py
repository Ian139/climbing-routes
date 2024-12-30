import flask
from flask_cors import CORS
import logging
from dotenv import load_dotenv
import sqlite3
import os

from api import blueprint as api_blueprint

app = flask.Flask(__name__)
CORS(app)
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_db_connection(board_name):
    """Get database connection, creating it if necessary."""
    db_path = os.path.join("data", board_name, "db.sqlite3")
    os.makedirs(os.path.dirname(db_path), exist_ok=True)
    
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    
    # Initialize tables based on the reference schema
    cursor = conn.cursor()
    cursor.executescript("""
        CREATE TABLE IF NOT EXISTS climbs (
            uuid TEXT PRIMARY KEY,
            name TEXT,
            setter_username TEXT,
            description TEXT,
            frames TEXT,
            frames_count INTEGER DEFAULT 1,
            is_draft INTEGER DEFAULT 0,
            is_listed INTEGER DEFAULT 1,
            layout_id INTEGER,
            edge_left REAL,
            edge_right REAL,
            edge_bottom REAL,
            edge_top REAL
        );
        
        CREATE TABLE IF NOT EXISTS climb_stats (
            climb_uuid TEXT,
            angle INTEGER,
            ascensionist_count INTEGER DEFAULT 0,
            display_difficulty REAL,
            quality_average REAL,
            difficulty_average REAL,
            benchmark_difficulty REAL,
            FOREIGN KEY(climb_uuid) REFERENCES climbs(uuid)
        );
    """)
    conn.commit()
    return conn

app.register_blueprint(api_blueprint)

if __name__ == "__main__":
    app.run(debug=True)