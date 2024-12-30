CREATE TABLE IF NOT EXISTS climbs (
    uuid TEXT PRIMARY KEY,
    name TEXT,
    setter_username TEXT,
    description TEXT,
    frames TEXT,
    frames_count INTEGER,
    layout_id TEXT,
    edge_left INTEGER,
    edge_right INTEGER,
    edge_bottom INTEGER,
    edge_top INTEGER,
    is_draft INTEGER,
    is_listed INTEGER
);

CREATE TABLE IF NOT EXISTS climb_stats (
    climb_uuid TEXT PRIMARY KEY,
    angle INTEGER,
    ascensionist_count INTEGER,
    display_difficulty TEXT,
    quality_average REAL,
    difficulty_average REAL,
    benchmark_difficulty TEXT,
    FOREIGN KEY (climb_uuid) REFERENCES climbs(uuid)
); 