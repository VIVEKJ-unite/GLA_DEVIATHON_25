from pydantic import BaseModel, Field, EmailStr, HttpUrl
from typing import List, Optional, Dict, Any, Union
from datetime import datetime
from enum import Enum
import uuid

class Platform(str, Enum):
    INSTAGRAM = "instagram"
    YOUTUBE = "youtube"
    TIKTOK = "tiktok"
    TWITTER = "twitter"

class BrandTone(str, Enum):
    FRIENDLY = "friendly"
    PROFESSIONAL = "professional"
    PLAYFUL = "playful"
    LUXURY = "luxury"
    INSPIRATIONAL = "inspirational"
    AUTHORITATIVE = "authoritative"

class CampaignGoal(str, Enum):
    AWARENESS = "awareness"
    SALES = "sales"
    UGC = "ugc"
    ENGAGEMENT = "engagement"
    LEAD_GENERATION = "lead_generation"
    COMMUNITY_BUILDING = "community_building"

class BudgetRange(str, Enum):
    MICRO = "micro"  # < 10K followers
    MID = "mid"      # 10K - 100K followers  
    MACRO = "macro"  # 100K - 1M followers
    MEGA = "mega"    # > 1M followers

class ContentType(str, Enum):
    REEL = "reel"
    POST = "post"
    STORY = "story"
    VIDEO = "video"
    CAROUSEL = "carousel"
    LIVE = "live"

class MessageStatus(str, Enum):
    DRAFT = "draft"
    SENT = "sent"
    DELIVERED = "delivered"
    OPENED = "opened"
    REPLIED = "replied"
    ACCEPTED = "accepted"
    REJECTED = "rejected"

# Request Models
class BrandSetup(BaseModel):
    brand_name: str = Field(..., min_length=1, max_length=100, example="EcoGlow Skincare")
    product_details: str = Field(..., min_length=10, max_length=2000, example="Sustainable skincare products using organic ingredients...")
    target_audience: str = Field(..., min_length=5, max_length=500, example="Women aged 25-40 interested in sustainability and natural beauty")
    brand_tone: BrandTone
    campaign_goals: List[CampaignGoal]
    platform_focus: List[Platform]
    budget_range: BudgetRange
    website: Optional[HttpUrl] = None
    social_handles: Optional[Dict[Platform, str]] = None
    key_message: Optional[str] = Field(None, max_length=500, example="Join us in revolutionizing sustainable beauty")
    competitor_influencers: Optional[List[str]] = Field(None, example=["@greenbeauty", "@ecowarrior"])

class InfluencerSearchFilters(BaseModel):
    niche: Optional[str] = None
    platform: Optional[Platform] = None
    min_followers: Optional[int] = Field(None, ge=0, le=10000000)
    max_followers: Optional[int] = Field(None, ge=0, le=10000000)
    min_engagement: Optional[float] = Field(None, ge=0, le=100)
    location: Optional[str] = None
    content_language: Optional[str] = None
    min_authenticity: Optional[float] = Field(None, ge=0, le=1)

# Response Models
class Influencer(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    handle: str
    platform: Platform
    followers: int = Field(..., ge=0)
    engagement_rate: float = Field(..., ge=0, le=100)
    niche: str
    location: str
    contact_email: Optional[EmailStr] = None
    profile_url: Optional[HttpUrl] = None
    brand_fit_score: float = Field(..., ge=0, le=100)
    audience_demographics: Dict[str, Any]
    content_style: List[str]
    authenticity_score: float = Field(..., ge=0, le=1)
    recent_posts: List[Dict[str, Any]]
    estimated_cost: Optional[float] = Field(None, ge=0)
    response_likelihood: Optional[float] = Field(None, ge=0, le=1)
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "12345",
                "name": "Emma Green",
                "handle": "emma_greenbeauty",
                "platform": "instagram",
                "followers": 45200,
                "engagement_rate": 4.2,
                "niche": "Sustainable Beauty",
                "location": "California, USA",
                "brand_fit_score": 92.5,
                "authenticity_score": 0.94,
                "content_style": ["educational", "inspirational"],
                "audience_demographics": {
                    "female": 78,
                    "age_18_24": 25,
                    "age_25_35": 65,
                    "sustainability_interest": 92
                }
            }
        }

class OutreachMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    campaign_id: str
    influencer_id: str
    influencer_name: str
    message: str
    status: MessageStatus
    sent_at: Optional[datetime] = None
    opened_at: Optional[datetime] = None
    replied_at: Optional[datetime] = None
    open_rate: Optional[float] = Field(None, ge=0, le=1)
    response: Optional[str] = None
    response_time_hours: Optional[float] = Field(None, ge=0)
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "msg_123",
                "campaign_id": "camp_123",
                "influencer_id": "inf_123",
                "influencer_name": "Emma Green",
                "message": "Hi Emma! Loved your recent post about sustainable skincare...",
                "status": "sent",
                "sent_at": "2024-01-15T10:30:00Z",
                "open_rate": 0.85
            }
        }

class Campaign(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    brand_setup: BrandSetup
    influencers: List[Influencer]
    status: str = Field(..., example="active")
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
    total_messages_sent: int = Field(0, ge=0)
    total_responses: int = Field(0, ge=0)
    confirmed_collaborations: int = Field(0, ge=0)
    estimated_roi: Optional[float] = Field(None, ge=0)
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "camp_123",
                "brand_setup": {
                    "brand_name": "EcoGlow Skincare",
                    "product_details": "Sustainable skincare...",
                    "target_audience": "Women 25-40 interested in sustainability",
                    "brand_tone": "friendly",
                    "campaign_goals": ["awareness", "sales"],
                    "platform_focus": ["instagram"],
                    "budget_range": "micro"
                },
                "status": "active",
                "total_messages_sent": 15,
                "total_responses": 5,
                "confirmed_collaborations": 3
            }
        }

class Analytics(BaseModel):
    campaign_id: str
    period_start: datetime
    period_end: datetime
    total_influencers: int = Field(..., ge=0)
    messages_sent: int = Field(..., ge=0)
    open_rate: float = Field(..., ge=0, le=1)
    response_rate: float = Field(..., ge=0, le=1)
    positive_responses: int = Field(..., ge=0)
    confirmed_collaborations: int = Field(..., ge=0)
    estimated_reach: int = Field(..., ge=0)
    estimated_engagement: int = Field(..., ge=0)
    total_investment: float = Field(..., ge=0)
    estimated_roi: float = Field(..., ge=0)
    top_performing_influencers: List[Dict[str, Any]]
    performance_trends: Dict[str, Any]
    
    class Config:
        json_schema_extra = {
            "example": {
                "campaign_id": "camp_123",
                "total_influencers": 15,
                "messages_sent": 12,
                "open_rate": 0.75,
                "response_rate": 0.42,
                "confirmed_collaborations": 5,
                "estimated_reach": 250000,
                "estimated_engagement": 12500
            }
        }

class APIResponse(BaseModel):
    success: bool
    message: str
    data: Optional[Any] = None
    error_code: Optional[str] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "success": True,
                "message": "Operation completed successfully",
                "data": {"campaign_id": "camp_123"}
            }
        }

# Database Models (for MongoDB)
class DBCampaign(BaseModel):
    id: str
    brand_setup: Dict[str, Any]
    influencers: List[Dict[str, Any]]
    status: str
    created_at: datetime
    updated_at: datetime
    analytics: Optional[Dict[str, Any]] = None

class DBInfluencer(BaseModel):
    id: str
    platform_data: Dict[str, Any]
    analysis_results: Dict[str, Any]
    created_at: datetime
    updated_at: datetime