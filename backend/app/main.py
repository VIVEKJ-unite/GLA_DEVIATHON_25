from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid
import random
import asyncio

app = FastAPI(
    title="ICY Influencer Outreach Agent",
    version="1.0.0",
    description="AI-powered influencer marketing platform"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class BrandSetup(BaseModel):
    brand_name: str = Field(..., min_length=1, max_length=100)
    product_details: str = Field(..., min_length=10, max_length=1000)
    target_audience: str = Field(..., min_length=5, max_length=500)
    brand_tone: str = Field(..., description="friendly, professional, playful, luxury")
    campaign_goals: List[str] = Field(..., description="awareness, sales, ugc, engagement")
    platform_focus: List[str] = Field(..., description="instagram, youtube, tiktok")
    budget_range: str = Field(..., description="micro, mid, macro")

class Influencer(BaseModel):
    id: str
    name: str
    handle: str
    platform: str
    followers: int
    engagement_rate: float
    niche: str
    location: str
    brand_fit_score: float = Field(..., ge=0, le=100)
    audience_demographics: Dict[str, Any]
    content_style: List[str]
    authenticity_score: float
    recent_posts: List[Dict[str, Any]]

class Campaign(BaseModel):
    id: str
    brand_setup: BrandSetup
    influencers: List[Influencer]
    status: str
    created_at: str
    total_messages_sent: int = 0
    response_rate: float = 0.0
    confirmed_collaborations: int = 0

class OutreachMessage(BaseModel):
    id: str
    campaign_id: str
    influencer_id: str
    influencer_name: str
    message: str
    status: str  # draft, sent, replied, accepted
    sent_at: Optional[str] = None
    open_rate: Optional[float] = None

class Analytics(BaseModel):
    campaign_id: str
    total_influencers: int
    messages_sent: int
    open_rate: float
    response_rate: float
    positive_responses: int
    confirmed_collaborations: int
    estimated_reach: int
    estimated_engagement: int

# Mock database
campaigns_db = []
messages_db = []

# Comprehensive mock influencer data
MOCK_INFLUENCERS = [
    {
        "id": "1", "name": "Emma Johnson", "handle": "Emma_GreenBeauty", 
        "platform": "instagram", "followers": 45200, "engagement_rate": 4.2,
        "niche": "Sustainable Beauty & Wellness", "location": "California, USA",
        "audience_demographics": {
            "gender": {"female": 78, "male": 22},
            "age": {"18-24": 25, "25-35": 65, "36-45": 10},
            "interests": {"sustainability": 92, "beauty": 88, "wellness": 85}
        },
        "content_style": ["educational", "inspirational", "tutorial"],
        "authenticity_score": 0.94,
        "recent_posts": [
            {"type": "reel", "topic": "Zero-waste skincare routine", "engagement": 4500},
            {"type": "carousel", "topic": "Sustainable packaging alternatives", "engagement": 3200}
        ]
    },
    {
        "id": "2", "name": "Sam Wilson", "handle": "SustainableSam", 
        "platform": "youtube", "followers": 125000, "engagement_rate": 3.8,
        "niche": "Eco-friendly Lifestyle & Technology", "location": "New York, USA",
        "audience_demographics": {
            "gender": {"female": 65, "male": 35},
            "age": {"18-24": 20, "25-35": 70, "36-45": 10},
            "interests": {"sustainability": 95, "technology": 80, "lifestyle": 75}
        },
        "content_style": ["documentary", "review", "how-to"],
        "authenticity_score": 0.88,
        "recent_posts": [
            {"type": "video", "topic": "Minimalist living space tour", "engagement": 25000},
            {"type": "vlog", "topic": "Eco-friendly product reviews", "engagement": 18000}
        ]
    },
    {
        "id": "3", "name": "Jessica Brown", "handle": "EcoWarriorJess", 
        "platform": "instagram", "followers": 28400, "engagement_rate": 5.1,
        "niche": "Zero Waste Lifestyle & Activism", "location": "London, UK",
        "audience_demographics": {
            "gender": {"female": 82, "male": 18},
            "age": {"18-24": 28, "25-35": 72},
            "interests": {"sustainability": 96, "activism": 88, "lifestyle": 82}
        },
        "content_style": ["activist", "educational", "community"],
        "authenticity_score": 0.91,
        "recent_posts": [
            {"type": "carousel", "topic": "Plastic-free alternatives for home", "engagement": 5200},
            {"type": "reel", "topic": "DIY natural cleaning products", "engagement": 6800}
        ]
    },
    {
        "id": "4", "name": "Alex Chen", "handle": "TechForGood", 
        "platform": "youtube", "followers": 89000, "engagement_rate": 4.5,
        "niche": "Sustainable Technology & Innovation", "location": "San Francisco, USA",
        "audience_demographics": {
            "gender": {"male": 68, "female": 32},
            "age": {"18-24": 25, "25-35": 75},
            "interests": {"technology": 90, "sustainability": 85, "innovation": 88}
        },
        "content_style": ["review", "tutorial", "news"],
        "authenticity_score": 0.85,
        "recent_posts": [
            {"type": "review", "topic": "Latest eco-friendly gadgets", "engagement": 15000},
            {"type": "tutorial", "topic": "Home energy monitoring setup", "engagement": 12000}
        ]
    },
    {
        "id": "5", "name": "Maya Patel", "handle": "ConsciousConsumer", 
        "platform": "instagram", "followers": 36700, "engagement_rate": 4.8,
        "niche": "Ethical Fashion & Conscious Living", "location": "Toronto, Canada",
        "audience_demographics": {
            "gender": {"female": 88, "male": 12},
            "age": {"18-24": 35, "25-35": 65},
            "interests": {"fashion": 85, "sustainability": 90, "lifestyle": 80}
        },
        "content_style": ["fashion", "lifestyle", "educational"],
        "authenticity_score": 0.92,
        "recent_posts": [
            {"type": "reel", "topic": "Slow fashion brand highlights", "engagement": 6800},
            {"type": "carousel", "topic": "Sustainable fabric guide", "engagement": 4200}
        ]
    }
]

@app.get("/")
async def root():
    return {
        "message": "🎯 ICY Influencer Outreach Agent API",
        "version": "1.0.0",
        "status": "running",
        "endpoints": {
            "docs": "/docs",
            "health": "/api/health",
            "campaigns": "/api/campaigns"
        }
    }

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0",
        "influencers_loaded": len(MOCK_INFLUENCERS)
    }

@app.post("/api/campaigns", response_model=Campaign)
async def create_campaign(brand_setup: BrandSetup):
    """Create a new influencer marketing campaign"""
    campaign_id = str(uuid.uuid4())
    
    # Filter and score influencers
    matching_influencers = []
    for inf_data in MOCK_INFLUENCERS:
        # Platform filter
        if inf_data["platform"] not in brand_setup.platform_focus:
            continue
            
        # Budget range filter
        followers = inf_data["followers"]
        if brand_setup.budget_range == "micro" and followers > 50000:
            continue
        elif brand_setup.budget_range == "mid" and (followers < 10000 or followers > 200000):
            continue
            
        # Calculate brand fit score
        fit_score = calculate_brand_fit_score(inf_data, brand_setup)
        if fit_score >= 50:  # Minimum threshold
            influencer = Influencer(**inf_data, brand_fit_score=fit_score)
            matching_influencers.append(influencer)
    
    # Sort by brand fit score
    matching_influencers.sort(key=lambda x: x.brand_fit_score, reverse=True)
    
    campaign = Campaign(
        id=campaign_id,
        brand_setup=brand_setup,
        influencers=matching_influencers[:15],  # Top 15 matches
        status="active",
        created_at=datetime.now().isoformat()
    )
    
    campaigns_db.append(campaign)
    return campaign

@app.get("/api/campaigns/{campaign_id}", response_model=Campaign)
async def get_campaign(campaign_id: str):
    """Get campaign details"""
    campaign = next((c for c in campaigns_db if c.id == campaign_id), None)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return campaign

@app.get("/api/campaigns")
async def list_campaigns():
    """List all campaigns"""
    return campaigns_db

@app.post("/api/campaigns/{campaign_id}/generate-messages")
async def generate_outreach_messages(campaign_id: str, background_tasks: BackgroundTasks):
    """Generate personalized outreach messages for top influencers"""
    campaign = next((c for c in campaigns_db if c.id == campaign_id), None)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    # Generate messages for top 8 influencers
    top_influencers = campaign.influencers[:8]
    generated_messages = []
    
    for influencer in top_influencers:
        message_content = generate_personalized_message(influencer, campaign.brand_setup)
        
        outreach_msg = OutreachMessage(
            id=str(uuid.uuid4()),
            campaign_id=campaign_id,
            influencer_id=influencer.id,
            influencer_name=influencer.name,
            message=message_content,
            status="draft"
        )
        messages_db.append(outreach_msg)
        generated_messages.append(outreach_msg)
    
    return {
        "success": True,
        "message": f"Generated {len(generated_messages)} personalized messages",
        "data": generated_messages
    }

@app.post("/api/messages/{message_id}/send")
async def send_message(message_id: str):
    """Send an outreach message"""
    message = next((m for m in messages_db if m.id == message_id), None)
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    if message.status != "draft":
        raise HTTPException(status_code=400, detail="Message already sent")
    
    # Simulate sending message
    message.status = "sent"
    message.sent_at = datetime.now().isoformat()
    message.open_rate = round(random.uniform(0.3, 0.8), 2)
    
    # Update campaign stats
    campaign = next((c for c in campaigns_db if c.id == message.campaign_id), None)
    if campaign:
        campaign.total_messages_sent += 1
    
    return {
        "success": True,
        "message": "Message sent successfully",
        "data": {"message_id": message_id, "status": "sent"}
    }

@app.post("/api/campaigns/{campaign_id}/messages/bulk-send")
async def bulk_send_messages(campaign_id: str):
    """Send all draft messages for a campaign"""
    draft_messages = [m for m in messages_db if m.campaign_id == campaign_id and m.status == "draft"]
    
    if not draft_messages:
        raise HTTPException(status_code=404, detail="No draft messages found for this campaign")
    
    sent_count = 0
    for message in draft_messages:
        message.status = "sent"
        message.sent_at = datetime.now().isoformat()
        message.open_rate = round(random.uniform(0.3, 0.8), 2)
        sent_count += 1
    
    # Update campaign
    campaign = next((c for c in campaigns_db if c.id == campaign_id), None)
    if campaign:
        campaign.total_messages_sent += sent_count
    
    return {
        "success": True,
        "message": f"Successfully sent {sent_count} messages",
        "data": {"sent_count": sent_count, "campaign_id": campaign_id}
    }

@app.get("/api/campaigns/{campaign_id}/analytics", response_model=Analytics)
async def get_campaign_analytics(campaign_id: str):
    """Get campaign analytics"""
    campaign = next((c for c in campaigns_db if c.id == campaign_id), None)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    campaign_messages = [m for m in messages_db if m.campaign_id == campaign_id]
    sent_messages = [m for m in campaign_messages if m.status == "sent"]
    
    if sent_messages:
        open_rate = sum(m.open_rate or 0 for m in sent_messages) / len(sent_messages)
        response_rate = random.uniform(0.2, 0.5)
        positive_responses = int(len(sent_messages) * response_rate * random.uniform(0.4, 0.8))
        confirmed_collaborations = int(positive_responses * random.uniform(0.3, 0.7))
    else:
        open_rate = response_rate = positive_responses = confirmed_collaborations = 0
    
    analytics = Analytics(
        campaign_id=campaign_id,
        total_influencers=len(campaign.influencers),
        messages_sent=len(sent_messages),
        open_rate=round(open_rate, 3),
        response_rate=round(response_rate, 3),
        positive_responses=positive_responses,
        confirmed_collaborations=confirmed_collaborations,
        estimated_reach=sum(inf.followers for inf in campaign.influencers[:5]),
        estimated_engagement=int(sum(inf.followers * inf.engagement_rate / 100 for inf in campaign.influencers[:5]))
    )
    
    return analytics

@app.get("/api/influencers")
async def search_influencers(
    niche: str = None,
    platform: str = None,
    min_followers: int = None,
    max_followers: int = None,
    min_engagement: float = None
):
    """Search influencers with filters"""
    filtered_influencers = MOCK_INFLUENCERS.copy()
    
    if niche:
        filtered_influencers = [inf for inf in filtered_influencers if niche.lower() in inf["niche"].lower()]
    if platform:
        filtered_influencers = [inf for inf in filtered_influencers if inf["platform"] == platform]
    if min_followers:
        filtered_influencers = [inf for inf in filtered_influencers if inf["followers"] >= min_followers]
    if max_followers:
        filtered_influencers = [inf for inf in filtered_influencers if inf["followers"] <= max_followers]
    if min_engagement:
        filtered_influencers = [inf for inf in filtered_influencers if inf["engagement_rate"] >= min_engagement]
    
    # Convert to Influencer models with brand fit scores
    influencers_with_scores = []
    for inf_data in filtered_influencers[:20]:
        fit_score = random.uniform(60, 95)
        influencer = Influencer(**inf_data, brand_fit_score=round(fit_score, 1))
        influencers_with_scores.append(influencer)
    
    return {
        "success": True,
        "message": f"Found {len(influencers_with_scores)} influencers",
        "data": influencers_with_scores
    }

# Helper functions
def calculate_brand_fit_score(influencer: dict, brand_setup: BrandSetup) -> float:
    """Calculate brand fit score between influencer and brand"""
    base_score = random.uniform(60, 80)
    
    # Niche alignment
    brand_keywords = brand_setup.product_details.lower().split()
    influencer_keywords = influencer["niche"].lower().split()
    
    niche_match = len(set(brand_keywords) & set(influencer_keywords))
    base_score += niche_match * 5
    
    # Engagement quality bonus
    if influencer.get("engagement_rate", 0) > 4.0:
        base_score += 10
    if influencer.get("authenticity_score", 0) > 0.8:
        base_score += 8
        
    return min(round(base_score, 1), 100)

def generate_personalized_message(influencer: Influencer, brand_setup: BrandSetup) -> str:
    """Generate personalized outreach message"""
    templates = [
        f"""Hi {influencer.name}! 

I was really impressed by your recent content about {influencer.niche.split('&')[0].strip().lower()} - your approach is so authentic and engaging!

At {brand_setup.brand_name}, we're creating {brand_setup.product_details.split('.')[0].lower()} and we think it would be a perfect fit for your audience. Your followers would love our focus on {brand_setup.target_audience.split(',')[0].lower()}.

Would you be open to exploring a collaboration? I'd love to share more details about what we have in mind!

Best,
The {brand_setup.brand_name} Team""",

        f"""Hello {influencer.name}! 

Your work in the {influencer.niche} space is truly inspiring! I particularly enjoyed your recent post about sustainability.

Our brand {brand_setup.brand_name} is looking to partner with creators who genuinely care about {brand_setup.target_audience.split(' ')[0].lower()}. We believe your audience would be very interested in our {brand_setup.product_details.split(' ')[0].lower()}.

Let me know if you'd be interested in discussing potential partnership opportunities!

Warm regards,
{brand_setup.brand_name}"""
    ]
    
    return random.choice(templates)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)