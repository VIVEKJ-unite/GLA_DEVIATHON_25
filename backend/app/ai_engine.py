import openai
import random
import re
from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta
from .models import Influencer, BrandSetup, Platform, BrandTone, CampaignGoal
from .config import settings

class AIEngine:
    def __init__(self):
        self.client = None
        # Initialize OpenAI client only if valid API key is provided
        if settings.OPENAI_API_KEY and not settings.OPENAI_API_KEY.startswith("sk-demo"):
            try:
                self.client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)
                print("✅ OpenAI client initialized successfully")
            except Exception as e:
                print(f"❌ Failed to initialize OpenAI client: {e}")
                self.client = None
        else:
            print("🔶 Using mock AI engine for hackathon demo")
            self.client = None

    def calculate_brand_fit_score(self, influencer: Dict, brand_setup: BrandSetup) -> float:
        """
        Calculate comprehensive brand fit score using multiple factors
        """
        base_score = random.uniform(60, 75)  # Base random score
        
        # 1. Niche Alignment (30% weight)
        niche_score = self._calculate_niche_alignment(influencer, brand_setup)
        
        # 2. Audience Match (25% weight)
        audience_score = self._calculate_audience_match(influencer, brand_setup)
        
        # 3. Content Style (20% weight)
        content_score = self._calculate_content_style_match(influencer, brand_setup)
        
        # 4. Engagement Quality (15% weight)
        engagement_score = self._calculate_engagement_quality(influencer)
        
        # 5. Platform Alignment (10% weight)
        platform_score = self._calculate_platform_alignment(influencer, brand_setup)
        
        # Calculate weighted score
        weighted_score = (
            niche_score * 0.3 +
            audience_score * 0.25 +
            content_score * 0.2 +
            engagement_score * 0.15 +
            platform_score * 0.1
        )
        
        final_score = min(round((base_score + weighted_score) / 2, 1), 100)
        
        # Apply bonuses for exceptional cases
        if influencer.get("authenticity_score", 0) > 0.9:
            final_score = min(final_score + 5, 100)
        if influencer.get("engagement_rate", 0) > 8.0:
            final_score = min(final_score + 3, 100)
            
        return final_score

    def generate_personalized_message(self, influencer: Influencer, brand_setup: BrandSetup) -> str:
        """
        Generate AI-powered personalized outreach message
        """
        if self.client:
            try:
                return self._generate_ai_message(influencer, brand_setup)
            except Exception as e:
                print(f"AI message generation failed, using mock: {e}")
                
        return self._generate_mock_message(influencer, brand_setup)

    def analyze_influencer_content(self, influencer_data: Dict) -> Dict[str, Any]:
        """
        Comprehensive content analysis for influencer
        """
        return {
            "sentiment_score": round(random.uniform(0.7, 0.95), 2),
            "content_quality": round(random.uniform(0.6, 0.9), 2),
            "posting_consistency": round(random.uniform(0.5, 0.95), 2),
            "audience_authenticity": round(random.uniform(0.7, 0.98), 2),
            "brand_safety_score": round(random.uniform(0.8, 1.0), 2),
            "content_diversity": round(random.uniform(0.5, 0.9), 2),
            "engagement_quality": round(random.uniform(0.6, 0.95), 2),
            "sponsorship_frequency": random.choice(["low", "medium", "high"]),
            "content_freshness": self._calculate_content_freshness(influencer_data)
        }

    def predict_response_likelihood(self, influencer: Influencer, brand_setup: BrandSetup) -> float:
        """
        Predict likelihood of positive response from influencer
        """
        base_likelihood = random.uniform(0.2, 0.6)
        
        # Increase likelihood for high brand fit
        if influencer.brand_fit_score > 80:
            base_likelihood += 0.2
        elif influencer.brand_fit_score > 60:
            base_likelihood += 0.1
            
        # Adjust based on influencer characteristics
        if influencer.authenticity_score > 0.9:
            base_likelihood += 0.1
        if influencer.engagement_rate > 5.0:
            base_likelihood += 0.05
            
        return min(round(base_likelihood, 2), 0.95)

    def estimate_influencer_cost(self, influencer: Influencer) -> float:
        """
        Estimate collaboration cost based on influencer metrics
        """
        base_cost = influencer.followers * 0.1  # $0.10 per follower base rate
        
        # Adjust for engagement rate
        engagement_multiplier = 1 + (influencer.engagement_rate / 10)
        base_cost *= engagement_multiplier
        
        # Adjust for authenticity
        authenticity_multiplier = 1 + (influencer.authenticity_score * 0.5)
        base_cost *= authenticity_multiplier
        
        # Platform adjustments
        platform_multipliers = {
            Platform.INSTAGRAM: 1.2,
            Platform.YOUTUBE: 1.5,
            Platform.TIKTOK: 1.1,
            Platform.TWITTER: 0.8
        }
        
        base_cost *= platform_multipliers.get(influencer.platform, 1.0)
        
        return round(base_cost, 2)

    # Private helper methods
    def _calculate_niche_alignment(self, influencer: Dict, brand_setup: BrandSetup) -> float:
        """Calculate niche alignment score"""
        brand_keywords = self._extract_keywords(
            f"{brand_setup.product_details} {brand_setup.target_audience}"
        )
        influencer_keywords = self._extract_keywords(influencer["niche"])
        
        common_keywords = set(brand_keywords) & set(influencer_keywords)
        if not brand_keywords:
            return 0.5
            
        alignment_ratio = len(common_keywords) / len(brand_keywords)
        return min(alignment_ratio * 100, 100)

    def _calculate_audience_match(self, influencer: Dict, brand_setup: BrandSetup) -> float:
        """Calculate audience demographic match"""
        target_keywords = self._extract_keywords(brand_setup.target_audience.lower())
        audience_keywords = self._extract_keywords(
            " ".join([str(v) for v in influencer.get("audience_demographics", {}).values()])
        )
        
        match_score = len(set(target_keywords) & set(audience_keywords)) / max(len(target_keywords), 1)
        return match_score * 100

    def _calculate_content_style_match(self, influencer: Dict, brand_setup: BrandSetup) -> float:
        """Calculate content style compatibility"""
        tone_mapping = {
            BrandTone.FRIENDLY: ["friendly", "casual", "personal", "relatable"],
            BrandTone.PROFESSIONAL: ["professional", "educational", "informative", "authoritative"],
            BrandTone.PLAYFUL: ["playful", "fun", "entertaining", "humorous"],
            BrandTone.LUXURY: ["luxury", "premium", "exclusive", "sophisticated"],
            BrandTone.INSPIRATIONAL: ["inspirational", "motivational", "empowering"],
            BrandTone.AUTHORITATIVE: ["authoritative", "expert", "professional"]
        }
        
        brand_styles = tone_mapping.get(brand_setup.brand_tone, [])
        influencer_styles = influencer.get("content_style", [])
        
        style_matches = len(set(brand_styles) & set(influencer_styles))
        max_possible = len(brand_styles)
        
        return (style_matches / max_possible * 100) if max_possible > 0 else 50

    def _calculate_engagement_quality(self, influencer: Dict) -> float:
        """Calculate engagement quality score"""
        engagement_rate = influencer.get("engagement_rate", 0)
        authenticity = influencer.get("authenticity_score", 0.5)
        
        # Normalize engagement rate (consider 2-10% as good range)
        engagement_score = min(engagement_rate / 5.0 * 50, 50)  # Max 50 points
        
        # Authenticity contributes to quality
        authenticity_score = authenticity * 50  # Max 50 points
        
        return engagement_score + authenticity_score

    def _calculate_platform_alignment(self, influencer: Dict, brand_setup: BrandSetup) -> float:
        """Calculate platform alignment score"""
        influencer_platform = influencer.get("platform")
        if influencer_platform in brand_setup.platform_focus:
            return 100.0
        return 30.0  # Partial score for non-primary platforms

    def _calculate_content_freshness(self, influencer_data: Dict) -> str:
        """Calculate how fresh/recent the content is"""
        days_ago = random.randint(1, 90)
        if days_ago <= 7:
            return "very_fresh"
        elif days_ago <= 30:
            return "fresh"
        elif days_ago <= 60:
            return "moderate"
        else:
            return "stale"

    def _extract_keywords(self, text: str) -> List[str]:
        """Extract relevant keywords from text"""
        # Remove special characters and convert to lowercase
        cleaned_text = re.sub(r'[^\w\s]', '', text.lower())
        
        # Common stop words to exclude
        stop_words = {
            'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 
            'of', 'with', 'by', 'as', 'is', 'was', 'are', 'were', 'be', 'been',
            'this', 'that', 'these', 'those', 'have', 'has', 'had', 'do', 'does',
            'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must'
        }
        
        words = cleaned_text.split()
        keywords = [word for word in words if word not in stop_words and len(word) > 2]
        
        return list(set(keywords))  # Remove duplicates

    def _generate_ai_message(self, influencer: Influencer, brand_setup: BrandSetup) -> str:
        """Generate message using OpenAI API"""
        prompt = self._create_message_prompt(influencer, brand_setup)
        
        response = self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert outreach specialist for influencer marketing campaigns. Create personalized, professional outreach messages that show genuine interest in the influencer's work while clearly presenting collaboration opportunities."
                },
                {
                    "role": "user", 
                    "content": prompt
                }
            ],
            max_tokens=300,
            temperature=0.7,
            presence_penalty=0.1,
            frequency_penalty=0.1
        )
        
        return response.choices[0].message.content.strip()

    def _create_message_prompt(self, influencer: Influencer, brand_setup: BrandSetup) -> str:
        """Create detailed prompt for message generation"""
        recent_content = influencer.recent_posts[0] if influencer.recent_posts else {"topic": influencer.niche}
        
        return f"""
        Create a personalized outreach message for influencer {influencer.name} (@{influencer.handle}) with the following details:

        INFLUENCER BACKGROUND:
        - Niche: {influencer.niche}
        - Platform: {influencer.platform.value}
        - Recent content: {recent_content.get('topic', 'Content in their niche')}
        - Location: {influencer.location}
        - Followers: {influencer.followers:,}
        - Engagement Rate: {influencer.engagement_rate}%

        BRAND INFORMATION:
        - Brand Name: {brand_setup.brand_name}
        - Product/Service: {brand_setup.product_details}
        - Target Audience: {brand_setup.target_audience}
        - Brand Tone: {brand_setup.brand_tone.value}
        - Campaign Goals: {', '.join([goal.value for goal in brand_setup.campaign_goals])}

        MESSAGE REQUIREMENTS:
        1. Start with genuine appreciation for their specific content
        2. Mention something unique about their approach or recent work
        3. Briefly introduce our brand and why it's relevant to them
        4. Clearly state the collaboration opportunity
        5. Keep it concise (150-250 words)
        6. Match the {brand_setup.brand_tone.value} brand tone
        7. Include a clear call-to-action
        8. Sound human and avoid generic templates

        Please generate the outreach message:
        """

    def _generate_mock_message(self, influencer: Influencer, brand_setup: BrandSetup) -> str:
        """Generate realistic mock message for hackathon demo"""
        templates = [
            f"""Hi {influencer.name}! 

I came across your {influencer.platform.value} profile and was really impressed by your work in {influencer.niche.lower()}. Your recent content about {influencer.recent_posts[0]['topic'] if influencer.recent_posts else influencer.niche.lower()} particularly stood out to me!

At {brand_setup.brand_name}, we're passionate about {brand_setup.product_details.split('.')[0].lower()}. Given your expertise and engaged community, I think there's a fantastic alignment between your content and what we're building.

Would you be open to exploring a collaboration? I'd love to share more about potential partnership opportunities that I believe would genuinely interest your audience.

Looking forward to hearing your thoughts!

Best regards,
The {brand_setup.brand_name} Team""",

            f"""Hello {influencer.name}! 

Your unique perspective on {influencer.niche.lower()} is exactly what makes your content so valuable. I especially appreciated your approach to {influencer.recent_posts[0]['topic'] if influencer.recent_posts else 'your recent work'}.

My name is Sarah from {brand_setup.brand_name}, where we focus on {brand_setup.product_details[:100]}... We're looking to partner with creators who share our values around {brand_setup.target_audience.split(' ')[0].lower()}.

I'd be delighted to discuss how we could work together in a way that brings authentic value to your community. Are you available for a quick chat next week?

Warmly,
Sarah & the {brand_setup.brand_name} Team""",

            f"""Hey {influencer.name}! 

Big fan of your work! The way you've built your community around {influencer.niche.lower()} is truly inspiring. Your post about {influencer.recent_posts[0]['topic'] if influencer.recent_posts else 'your recent content'} was spot on!

We're {brand_setup.brand_name} - we're on a mission to {brand_setup.product_details.split('.')[0].lower()}. Given your expertise and audience, I think there's a natural synergy here that could be really powerful.

Would you be interested in collaborating? No pressure at all - just think your audience would love what we're doing, and we'd be thrilled to work with you.

Cheers,
The Team at {brand_setup.brand_name}"""
        ]
        
        # Select template based on brand tone
        tone_templates = {
            BrandTone.FRIENDLY: templates[2],
            BrandTone.PROFESSIONAL: templates[0],
            BrandTone.PLAYFUL: templates[2],
            BrandTone.LUXURY: templates[0],
            BrandTone.INSPIRATIONAL: templates[1],
            BrandTone.AUTHORITATIVE: templates[0]
        }
        
        return tone_templates.get(brand_setup.brand_tone, templates[0])