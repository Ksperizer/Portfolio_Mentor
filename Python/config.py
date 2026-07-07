from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    neo4j_uri: str = "bolt://localhost:7687"
    neo4j_user: str = "neo4j"
    neo4j_password: str = "password"
    tmdb_api_key: str = ""
    tmdb_read_token: str = ""
    tmdb_api_base: str = "https://api.themoviedb.org/3"
    tmdb_cast_limit: int = 15

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()