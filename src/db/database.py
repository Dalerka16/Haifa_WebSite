from sqlalchemy.orm import create_session, DeclarativeBase, sessionmaker
from sqlalchemy import create_engine
from core.config import settings


#This variable tells SQLAlchemy where to connect
SQLALCHEMY_DATABASE_URL = settings.database_url

#Here we create connection between the server and the database
engine = create_engine(SQLALCHEMY_DATABASE_URL)


#For each request to a database, there should be created a session.
#SessionLocal is a class for creating these sessions(session is essentially a transaction with the database).
SessionLocal = sessionmaker(bind=engine,
                            autocommit=False,
                            autoflush=False)


#Serves as a "pipe" between the server and the database.
#Essentially get_db is a dependency function, that provides sessions for our routers.
def get_db():
    with SessionLocal() as db:
        yield db



#class Base is needed to build models for SQLAlchemy
class Base(DeclarativeBase):
    pass




