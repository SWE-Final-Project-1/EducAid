from config.config import Config
import psycopg2

conn = psycopg2.connect(
    host= Config.DB_HOST,
    database=Config.DB_NAME,
    user=Config.DB_USER,
    password=Config.DB_PASSWORD
)

