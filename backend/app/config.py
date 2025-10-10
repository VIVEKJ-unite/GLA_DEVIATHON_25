import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "ICY Influencer Outreach Agent"
    PROJECT_VERSION: str = "1.0.0"
    DESCRIPTION: str = "AI-powered influencer marketing platform that turns guesswork into data-driven success"
    
    # API Configuration
    API_V1_STR: str = "/api/v1"
    BACKEND_CORS_ORIGINS: list = ["http://localhost:3000", "http://127.0.0.1:3000"]
    
    # OpenAI Configuration
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "sk-demo-key-for-hackathon")
    
    # Database Configuration
    MONGODB_URL: str = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
    DATABASE_NAME: str = "icy_influencer_db"
    
    # External APIs (Mock for hackathon)
    INSTAGRAM_API_KEY: str = os.getenv("INSTAGRAM_API_KEY", "mock_instagram_key")
    YOUTUBE_API_KEY: str = os.getenv("YOUTUBE_API_KEY", "mock_youtube_key")
    TIKTOK_API_KEY: str = os.getenv("TIKTOK_API_KEY", "mock_tiktok_key")
    
    # Application Settings
    MAX_INFLUENCERS_PER_CAMPAIGN: int = 20
    DEFAULT_PAGE_SIZE: int = 10
    MESSAGE_GENERATION_TIMEOUT: int = 30
    
    # File Upload Settings
    MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10MB
    ALLOWED_EXTENSIONS: list = [".jpg", ".jpeg", ".png", ".pdf", ".txt"]
    
    @property
    def database_url(self) -> str:
        return f"{self.MONGODB_URL}/{self.DATABASE_NAME}"

# Global settings instance
settings = Settings()

# API Tags for documentation
api_tags_metadata = [
    {
        "name": "campaigns",
        "description": "Operations with influencer campaigns. Create, manage, and track your outreach campaigns."
    },
    {
        "name": "influencers", 
        "description": "Search and analyze influencers across different platforms."
    },
    {
        "name": "messages",
        "description": "Manage outreach messages and track their performance."
    },
    {
        "name": "analytics",
        "description": "Get detailed analytics and insights about your campaigns."
    },
    {
        "name": "health",
        "description": "Health check and system status endpoints."
    }
]