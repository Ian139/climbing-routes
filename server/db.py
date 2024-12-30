import sqlite3

def get_db_connection(board_name):
    return sqlite3.connect(f"data/{board_name}.db")