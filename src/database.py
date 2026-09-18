from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# כתובת ההתחברות למסד הנתונים (נעדכן את הסיסמה והשם בהמשך)
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:password@localhost:5432/ch_f_database"

# יצירת המנוע שמתחבר בפועל
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# הגדרת ה"שיחות" (Sessions) מול מסד הנתונים
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# התבנית הבסיסית שממנה נייצר את הטבלאות
Base = declarative_base()

# פונקציית העזר שפותחת וסוגרת את הדלת למסד הנתונים בכל בקשה
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()