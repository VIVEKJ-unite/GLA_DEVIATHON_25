#!/usr/bin/env python3
"""
Test script for Instagram fraud detection

Run this to test the fraud detection API with your Instagram username
"""

import requests
import json

def test_fraud_detection(username):
    """Test fraud detection with a username"""
    url = "http://localhost:8000/api/ai/fraud-detect"
    
    payload = {
        "username": username,
        "use_mock_data": True  # Set to False if you have real Instagram access token
    }
    
    try:
        print(f"🔍 Analyzing Instagram user: @{username}")
        print("⏳ Running AI fraud detection...")
        
        response = requests.post(url, json=payload)
        
        if response.status_code == 200:
            data = response.json()
            
            print("\n" + "="*50)
            print(f"📊 FRAUD ANALYSIS RESULTS")
            print("="*50)
            print(f"Username: @{data['username']}")
            print(f"Fraud Risk Score: {data['fraud_risk_score']}%")
            print(f"Authenticity Score: {data['authenticity_score']}%")
            print(f"Data Source: {data['data_source']}")
            
            # Risk level
            risk_level = "🟢 LOW" if data['fraud_risk_score'] < 30 else "🟡 MEDIUM" if data['fraud_risk_score'] < 70 else "🔴 HIGH"
            print(f"Risk Level: {risk_level}")
            
            # Flags
            if data['flags']:
                print(f"\n⚠️  DETECTED ISSUES ({len(data['flags'])}):")
                for flag in data['flags']:
                    severity_emoji = "🔴" if flag['severity'] == 'high' else "🟡" if flag['severity'] == 'medium' else "🟢"
                    print(f"  {severity_emoji} {flag['description']}")
            else:
                print("\n✅ No suspicious activity detected")
            
            # Recommendations
            print(f"\n💡 RECOMMENDATIONS:")
            for rec in data['recommendations']:
                print(f"  • {rec}")
            
            print("\n" + "="*50)
            
        else:
            print(f"❌ Error: {response.status_code}")
            print(response.text)
            
    except requests.exceptions.ConnectionError:
        print("❌ Error: Cannot connect to API server")
        print("Make sure the backend is running on http://localhost:8000")
    except Exception as e:
        print(f"❌ Error: {e}")

def test_public_data(username):
    """Test public Instagram data endpoint"""
    url = f"http://localhost:8000/api/instagram/public/{username}"
    
    try:
        print(f"📱 Fetching public data for: @{username}")
        
        response = requests.get(url)
        
        if response.status_code == 200:
            data = response.json()
            
            print("\n" + "-"*40)
            print(f"📊 PUBLIC PROFILE DATA")
            print("-"*40)
            print(f"Username: @{data['username']}")
            print(f"Followers: {data['profile']['follower_count']:,}")
            print(f"Posts: {data['profile']['media_count']}")
            print(f"Niche: {data['profile']['niche']}")
            print(f"Recent Posts Analyzed: {data['recent_posts']}")
            print(f"Note: {data['note']}")
            print("-"*40)
            
        else:
            print(f"❌ Error: {response.status_code}")
            
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    print("🎯 ICY Platform - Instagram Fraud Detection Test")
    print("=" * 50)
    
    # Test with different usernames
    test_usernames = [
        "your_username",  # Replace with your actual Instagram username
        "beauty_guru_test",
        "tech_reviewer_demo",
        "food_blogger_sample"
    ]
    
    for username in test_usernames:
        print(f"\n🧪 Testing with username: {username}")
        test_public_data(username)
        test_fraud_detection(username)
        print("\n" + "="*50)
    
    print("\n✅ Testing complete!")
    print("\n💡 To test with your real Instagram:")
    print("1. Replace 'your_username' with your actual Instagram handle")
    print("2. Run: python test_fraud_detection.py")
    print("3. Check the results!")
    print("\n🔗 For real Instagram API access, see:")
    print("   backend/app/instagram_auth.py")