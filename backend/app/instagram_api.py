import requests
import json
from datetime import datetime, timedelta
import asyncio
import aiohttp

class InstagramAPI:
    def __init__(self):
        # Instagram Basic Display API endpoints
        self.base_url = "https://graph.instagram.com"
        self.api_version = "v18.0"
        
    async def get_user_profile(self, access_token):
        """Get user profile information"""
        url = f"{self.base_url}/me"
        params = {
            'fields': 'id,username,account_type,media_count',
            'access_token': access_token
        }
        
        async with aiohttp.ClientSession() as session:
            async with session.get(url, params=params) as response:
                if response.status == 200:
                    return await response.json()
                else:
                    return None
    
    async def get_user_media(self, access_token, limit=25):
        """Get user's recent media posts"""
        url = f"{self.base_url}/me/media"
        params = {
            'fields': 'id,media_type,media_url,permalink,thumbnail_url,timestamp,caption',
            'limit': limit,
            'access_token': access_token
        }
        
        async with aiohttp.ClientSession() as session:
            async with session.get(url, params=params) as response:
                if response.status == 200:
                    return await response.json()
                else:
                    return None
    
    async def get_media_insights(self, media_id, access_token):
        """Get insights for a specific media post"""
        url = f"{self.base_url}/{media_id}/insights"
        params = {
            'metric': 'engagement,impressions,reach,saved',
            'access_token': access_token
        }
        
        async with aiohttp.ClientSession() as session:
            async with session.get(url, params=params) as response:
                if response.status == 200:
                    return await response.json()
                else:
                    return None

    def analyze_fraud_indicators(self, profile_data, media_data, insights_data):
        """Analyze data for fraud indicators"""
        fraud_score = 0
        flags = []
        
        # Check engagement consistency
        if insights_data:
            engagement_rates = []
            for insight in insights_data:
                if 'engagement' in insight and 'impressions' in insight:
                    eng_rate = (insight['engagement'] / insight['impressions']) * 100
                    engagement_rates.append(eng_rate)
            
            if engagement_rates:
                avg_engagement = sum(engagement_rates) / len(engagement_rates)
                engagement_variance = sum((x - avg_engagement) ** 2 for x in engagement_rates) / len(engagement_rates)
                
                # High variance indicates inconsistent engagement (suspicious)
                if engagement_variance > 50:
                    fraud_score += 25
                    flags.append({
                        "type": "engagement_inconsistency",
                        "severity": "medium",
                        "description": f"Engagement variance is {engagement_variance:.1f}% (normal: <20%)"
                    })
        
        # Check posting frequency
        if media_data and 'data' in media_data:
            posts = media_data['data']
            if len(posts) >= 10:
                timestamps = [datetime.fromisoformat(post['timestamp'].replace('Z', '+00:00')) for post in posts[:10]]
                timestamps.sort()
                
                # Check for unusual posting patterns
                intervals = [(timestamps[i+1] - timestamps[i]).total_seconds() / 3600 for i in range(len(timestamps)-1)]
                avg_interval = sum(intervals) / len(intervals)
                
                # Very frequent posting (less than 2 hours average) can be suspicious
                if avg_interval < 2:
                    fraud_score += 15
                    flags.append({
                        "type": "excessive_posting",
                        "severity": "low",
                        "description": f"Average posting interval: {avg_interval:.1f} hours (normal: >6 hours)"
                    })
        
        # Account type check
        if profile_data and profile_data.get('account_type') == 'BUSINESS':
            # Business accounts are generally more trustworthy
            fraud_score -= 10
        
        # Media count vs engagement check
        if profile_data and insights_data:
            media_count = profile_data.get('media_count', 0)
            if media_count > 1000 and len(insights_data) > 0:
                # High media count with low engagement can be suspicious
                avg_engagement = sum(insight.get('engagement', 0) for insight in insights_data) / len(insights_data)
                if avg_engagement < 100:  # Very low engagement
                    fraud_score += 20
                    flags.append({
                        "type": "low_engagement_high_content",
                        "severity": "medium",
                        "description": f"High content volume ({media_count}) but low engagement ({avg_engagement:.0f})"
                    })
        
        # Ensure fraud score is between 0-100
        fraud_score = max(0, min(100, fraud_score))
        
        return {
            "fraud_risk_score": fraud_score,
            "authenticity_score": 100 - fraud_score,
            "flags": flags,
            "analysis_timestamp": datetime.now().isoformat()
        }

# Fallback scraping method (for demo purposes)
class InstagramScraper:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
    
    def get_public_profile_data(self, username):
        """Get public profile data (limited info)"""
        try:
            # This is a simplified version - real scraping would be more complex
            url = f"https://www.instagram.com/{username}/"
            response = self.session.get(url)
            
            if response.status_code == 200:
                # Extract basic info from page (simplified)
                # In reality, you'd parse the JSON data from the page
                return {
                    "username": username,
                    "is_verified": False,  # Would extract from page
                    "is_private": False,   # Would extract from page
                    "follower_count": None,  # Instagram doesn't show exact counts publicly
                    "following_count": None,
                    "post_count": None,
                    "bio": "",
                    "external_url": None
                }
            else:
                return None
        except Exception as e:
            print(f"Error scraping profile: {e}")
            return None

# Mock data generator for testing
def generate_mock_instagram_data(username):
    """Generate realistic mock data for testing"""
    import random
    
    # Simulate realistic Instagram data
    follower_count = random.randint(1000, 100000)
    post_count = random.randint(50, 500)
    
    # Generate mock media data
    media_data = []
    for i in range(12):  # Last 12 posts
        engagement = random.randint(int(follower_count * 0.01), int(follower_count * 0.08))
        media_data.append({
            "id": f"mock_media_{i}",
            "media_type": random.choice(["IMAGE", "VIDEO", "CAROUSEL_ALBUM"]),
            "timestamp": (datetime.now() - timedelta(days=i*2)).isoformat(),
            "engagement": engagement,
            "impressions": engagement * random.randint(5, 15),
            "reach": engagement * random.randint(3, 10),
            "saved": engagement * random.uniform(0.1, 0.3)
        })
    
    profile_data = {
        "id": f"mock_user_{username}",
        "username": username,
        "account_type": random.choice(["PERSONAL", "BUSINESS", "CREATOR"]),
        "media_count": post_count,
        "follower_count": follower_count,
        "following_count": random.randint(100, 2000)
    }
    
    return profile_data, {"data": media_data}, media_data