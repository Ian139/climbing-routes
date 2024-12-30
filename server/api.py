import flask
import boardlib.api.aurora
import logging
import os
from dotenv import load_dotenv
from db import get_db_connection

blueprint = flask.Blueprint("api", __name__)
logger = logging.getLogger(__name__)

def sync_board_data(board_name, username, password):
    """Sync board data from API to local database."""
    try:
        logger.info(f"Starting sync for {board_name}")
        
        # Get login token
        login_info = boardlib.api.aurora.login(board_name, username, password)
        logger.info("Login successful")
        
        # Get database connection
        conn = get_db_connection(board_name)
        cursor = conn.cursor()
        
        # Get climbs from API
        logger.info("Fetching climbs from API")
        climbs = boardlib.api.aurora.get_climbs(
            board_name,
            token=login_info["token"],
            user_id=login_info["user_id"]
        )
        
        if not climbs:
            logger.error("No climbs returned from API")
            return False
            
        # Insert data into database
        for climb in climbs:
            logger.info(f"Processing climb: {climb.get('name')}")
            # Insert into climbs table
            cursor.execute("""
                INSERT OR REPLACE INTO climbs (
                    uuid, name, setter_username, description, frames, 
                    frames_count, layout_id, edge_left, edge_right, 
                    edge_bottom, edge_top, is_draft, is_listed
                )
                VALUES (?, ?, ?, ?, ?, 1, ?, ?, ?, ?, ?, 0, 1)
            """, (
                climb.get("uuid"), climb.get("name"), climb.get("setter_username"),
                climb.get("description"), climb.get("frames"), climb.get("layout_id"),
                climb.get("edge_left"), climb.get("edge_right"),
                climb.get("edge_bottom"), climb.get("edge_top")
            ))
            
            # Insert into climb_stats table
            cursor.execute("""
                INSERT OR REPLACE INTO climb_stats (
                    climb_uuid, angle, ascensionist_count, display_difficulty,
                    quality_average, difficulty_average, benchmark_difficulty
                )
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (
                climb.get("uuid"), climb.get("angle"), climb.get("ascensionist_count", 0),
                climb.get("grade"), climb.get("quality_average"),
                climb.get("difficulty_average"), climb.get("benchmark_difficulty")
            ))
        
        conn.commit()
        logger.info("Sync completed successfully")
        return True
        
    except Exception as e:
        logger.error(f"Sync error: {str(e)}", exc_info=True)
        return False

@blueprint.route("/api/boards/<board_name>/routes")
def get_routes(board_name):
    username = os.getenv('KILTER_USERNAME')
    password = os.getenv('KILTER_PASSWORD')
    
    if not username or not password:
        return flask.jsonify({"error": "Missing credentials"}), 401
        
    try:
        # Sync data first
        if not sync_board_data(board_name, username, password):
            return flask.jsonify({"error": "Failed to sync data"}), 500
            
        conn = get_db_connection(board_name)
        cursor = conn.cursor()
        
        # Get routes from database
        cursor.execute("""
            SELECT 
                c.uuid,
                c.name,
                c.setter_username as author,
                c.angle,
                cs.ascensionist_count as climbers,
                cs.display_difficulty as grade
            FROM climbs c
            LEFT JOIN climb_stats cs ON c.uuid = cs.climb_uuid
            WHERE c.is_draft = 0 AND c.is_listed = 1
        """)
        
        routes = [dict(row) for row in cursor.fetchall()]
        return flask.jsonify(routes)
        
    except Exception as e:
        logger.error(f"Database error: {str(e)}")
        return flask.jsonify({"error": str(e)}), 500