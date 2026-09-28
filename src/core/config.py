"""The config.py module is designed to allow our code securely
    use the sensitive data from the .env file"""
from pydantic import field_validator
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url : str
    api_prefix : str = "/api"
    allowed_origins : str
    image_private_key : str
    image_public_key : str
    image_url : str

    """class Config allows to retrieve sensitive data from .env file"""
    class Config:
        env_file = ".env"

    """After getting the DATABASE_URL from .env file as a string 
    we need to parse it into a list in order to use it in main:app.add_middleware(allow_origins)"""
    @field_validator("allowed_origins")
    def parse_data_to_list(val : str) -> list[str]:
        return val.split(",")

settings = Settings()
