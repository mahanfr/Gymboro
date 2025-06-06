import sqlite3
import json

conn = sqlite3.connect("database.db")
cursor = conn.cursor()

"""
  workout types:
      rep-weight,
      rep,
      distance,
      time,
"""

cursor.execute('''
    CREATE TABLE IF NOT EXISTS workout (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       name TEXT NOT NULL UNIQUE,
       muscles_affected_json TEXT,
       category TEXT NOT NULL,
       type TEXT NOT NULL DEFAULT 'rep-weight',
       description TEXT,
       name_fa TEXT,
       description_fa TEXT,
       similar_workouts_json TEXT
    )''')

cursor.execute('''
    CREATE TABLE IF NOT EXISTS routine (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL
    )''')

cursor.execute('''
    CREATE TABLE IF NOT EXISTS routine_workout (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        set_json TEXT,
        routine INTEGER,
        workout INTEGER,
        FOREIGN KEY (routine) REFERENCES routine(id),
        FOREIGN KEY (workout) REFERENCES workout(id)
    )''')

cursor.execute('''
    CREATE TABLE IF NOT EXISTS workout_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        workout INTEGER,
        work_json TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (workout) REFERENCES workout(id)
    )''')


with open("../data/workouts.json", "r", encoding='utf-8') as file:
    data = json.load(file)

for item in data:
    cursor.execute("INSERT INTO workout (name, muscles_affected_json, category, description, name_fa, description_fa, similar_workouts_json) VALUES (?,?,?,?,?,?,?)",
                   (item['name'],
                    str(item['muscles_affected']),
                    item['category'],
                    item['description'],
                    item['name_fa'],
                    item['description_fa'],
                    str(item['similar_workouts']))
                   )


conn.commit()
