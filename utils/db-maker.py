import sqlite3
import json

conn = sqlite3.connect("database.db")
cursor = conn.cursor()

cursor.execute('''
    CREATE TABLE IF NOT EXISTS workout (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       name TEXT NOT NULL UNIQUE,
       muscles_affected_json TEXT,
       category TEXT NOT NULL,
       description TEXT,
       name_fa TEXT,
       description_fa TEXT,
       similar_workouts_json TEXT
    )''')

with open("workouts.json", "r", encoding='utf-8') as file:
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
