#!/usr/bin/env python3
"""
Test Live Instagram Scraping

This script tests the live Instagram fraud detection with real usernames
"""

import requests
import json
import asyncio

def test_live_fraud_detection(username):
    """Test live fraud detection"""
    url = "http://localhost:8000/api/ai/fraud-detect"
    
    payload = {
        "username": username,
        "use_live_data": True
    }
    
    try:
        print(f"🔍 Testing LIVE fraud detection for @{username}")
        print("⏳ Scraping Instagram data in real-time...")
        
        response = requests.post(url, json=payload, timeout=30)
        
        if response.status_code == 200:
            data = response.json()
            
            print("\n" + "="*60)
            print(f"🎯 LIVE FRAUD ANALYSIS RESULTS")
            print("="*60)
            print(f"Username: @{data['username']}")
            print(f"Data Source: {data['data_source']}")
            print(f"Fraud Risk Score: {data['fraud_risk_score']}%")
            print(f"Authenticity Score: {data['authenticity_score']}%")
            
            # Risk assessment
            if data['fraud_risk_score'] < 30:
                risk_emoji = "🟢"
                risk_text = "LOW RISK - Safe to collaborate"
            elif data['fraud_risk_score'] < 70:
                risk_emoji = "🟡"
                risk_text = "MEDIUM RISK - Proceed with caution"
            else:
                risk_emoji = "🔴"
                risk_text = "HIGH RISK - Not recommended"
            
            print(f"Risk Level: {risk_emoji} {risk_text}")
            
            # Show detected issues
            if data['flags']:
                print(f"\n⚠️  DETECTED ISSUES ({len(data['flags'])}):")
                for i, flag in enumerate(data['flags'], 1):
                    severity_emoji = {"low": "🟢", "medium": "🟡", "high": "🔴"}.get(flag['severity'], "⚪")
                    print(f"  {i}. {severity_emoji} [{flag['severity'].upper()}] {flag['description']}")
            else:
                print("\n✅ No suspicious patterns detected!")
            
            # Show recommendations
            print(f"\n💡 AI RECOMMENDATIONS:")
            for i, rec in enumerate(data['recommendations'], 1):
                print(f"  {i}. {rec}")
            
            print("\n" + "="*60)
            return True
            
        else:
            print(f"❌ API Error: {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except requests.exceptions.Timeout:
        print("⏰ Request timed out - Instagram scraping may take longer for some profiles")
        return False
    except requests.exceptions.ConnectionError:
        print("❌ Connection Error: Make sure the backend server is running")
        print("Run: cd backend && python run.py")
        return False
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return False

def test_live_profile_data(username):
    """Test live profile data endpoint"""
    url = f"http://localhost:8000/api/instagram/live/{username}"
    
    try:
        print(f"📱 Fetching LIVE profile data for @{username}")
        
        response = requests.get(url, timeout=20)
        
        if response.status_code == 200:
            data = response.json()
            profile = data['profile']
            
            print("\n" + "-"*50)
            print(f"📊 LIVE INSTAGRAM PROFILE DATA")
            print("-"*50)
            print(f"Username: @{profile['username']}")
            print(f"Full Name: {profile.get('full_name', 'N/A')}")
            print(f"Followers: {profile.get('follower_count', 0):,}")
            print(f"Following: {profile.get('following_count', 0):,}")
            print(f"Posts: {profile.get('post_count', 0):,}")
            print(f"Engagement Rate: {profile.get('engagement_rate', 0)}%")
            print(f"Verified: {'✅' if profile.get('is_verified') else '❌'}")
            print(f"Business Account: {'✅' if profile.get('is_business_account') else '❌'}")
            print(f"Private: {'🔒' if profile.get('is_private') else '🌐'}")
            print(f"Recent Posts Analyzed: {len(profile.get('recent_posts', []))}")
            print(f"Data Source: {profile.get('data_source', 'unknown')}")
            print(f"Scraped At: {profile.get('scraped_at', 'unknown')}")
            print("-"*50)
            return True
            
        else:
            print(f"❌ Error: {response.status_code} - {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    print("🎯 ICY Platform - LIVE Instagram Fraud Detection Test")
    print("=" * 60)
    print("🔴 LIVE MODE: Real Instagram data scraping enabled!")
    print("=" * 60)
    
    # Test usernames - replace with real Instagram usernames
    test_usernames = [
        "cristiano",      # Cristiano Ronaldo (public figure)
        "instagram",      # Instagram official account
        "natgeo",         # National Geographic
        "your_username"   # Replace with your Instagram username
    ]
    
    success_count = 0
    total_tests = 0
    
    for username in test_usernames:
        if username == "your_username":
            print(f"\n⚠️  Skipping '{username}' - Replace with your actual Instagram username")
            continue
            
        print(f"\n🧪 Testing with LIVE Instagram account: @{username}")
        print("-" * 40)
        
        # Test profile data
        if test_live_profile_data(username):
            success_count += 1
        total_tests += 1
        
        # Test fraud detection
        if test_live_fraud_detection(username):
            success_count += 1
        total_tests += 1
        
        print("\n" + "="*60)
    
    print(f"\n📊 TEST RESULTS:")
    print(f"✅ Successful: {success_count}/{total_tests}")
    print(f"❌ Failed: {total_tests - success_count}/{total_tests}")
    
    if success_count > 0:
        print(f"\n🎉 LIVE Instagram scraping is working!")
        print(f"🔴 You can now analyze any public Instagram account in real-time!")
    else:
        print(f"\n⚠️  All tests failed. Check if:")
        print(f"   1. Backend server is running (python run.py)")
        print(f"   2. Internet connection is stable")
        print(f"   3. Instagram accounts are public")
    
    print(f"\n💡 To test with your own Instagram:")
    print(f"   1. Replace 'your_username' with your actual Instagram handle")
    print(f"   2. Make sure your account is public")
    print(f"   3. Run this script again")
    
    print(f"\n🚀 Ready to use in the frontend!")
    print(f"   Go to AI Tools → Fraud Detector → Enter any username → Analyze LIVE")