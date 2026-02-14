# POC Setup with Python LLM Service

## ✅ What Was Created

```
poc/
├── python_service/          ← NEW: Python LLM Service
│   ├── main.py              # FastAPI server with OpenAI
│   ├── requirements.txt      # Python dependencies
│   ├── .env                  # OpenAI API key
│   └── README.md             # Python service docs
│
├── server/
│   ├── src/
│   │   ├── customPythonAgent.ts  ← NEW: Custom agent for Python
│   │   ├── agents.ts             ← UPDATED: Added pythonCustom()
│   │   ├── call.ts               ← UPDATED: Uses Python agent
│   │   └── ...
│   └── ...
│
└── client/
    └── ...
```

## 🚀 Complete Setup Steps

### **Step 1: Start Python LLM Service**

Open **PowerShell Terminal 1:**

```powershell
cd c:\Users\gaurav.palve\Desktop\testing_gaurav\micdrop\poc\python_service

# Install dependencies (first time only)
pip install -r requirements.txt

# Run Python service
python main.py
```

**Expected output:**
```
INFO:     Uvicorn running on http://127.0.0.1:5000
```

### **Step 2: Start Micdrop POC**

Open **PowerShell Terminal 2:**

```powershell
cd c:\Users\gaurav.palve\Desktop\testing_gaurav\micdrop\poc

# Run Micdrop (server + client)
pnpm dev
```

**Expected output:**
```
[server] POC Server running on port 8081
[client] ➜  Local:   http://localhost:5173/
```

### **Step 3: Open Browser**

Open: **http://localhost:5173/**

## 🎤 How It Works Now

```
User Voice (Microphone)
    ↓
Gladia (Speech-to-Text)
    ↓
Python LLM Service (OpenAI + Your Documents)
    ↓
ElevenLabs (Text-to-Speech)
    ↓
User Speaker (Audio Response)
```

## 📚 Customizing Your Documents

Edit `poc/python_service/main.py` and update the `DOCUMENTS` variable with your knowledge base:

```python
DOCUMENTS = """
You are a helpful AI assistant with access to the following documents:

=== KNOWLEDGE BASE ===

Your Company Info:
- Product: Your product name
- Founded: Year
- Website: https://example.com

Customer Support FAQ:
- Q: How do I get started?
- A: Visit our website...

Technical Documentation:
- Feature 1: Description
- Feature 2: Description

=== END KNOWLEDGE BASE ===
"""
```

The LLM will now answer questions based on your documents!

## 🔑 API Keys Setup

All API keys are already configured:

- ✅ **OpenAI** in `poc/python_service/.env` and `poc/server/.env`
- ✅ **Gladia** in `poc/server/.env`
- ✅ **ElevenLabs** in `poc/server/.env`

## 📊 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser Client                           │
│                  (http://localhost:5173)                   │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ WebSocket
                 ↓
┌─────────────────────────────────────────────────────────────┐
│              Node.js Server (port 8081)                     │
│  - Handles WebSocket connections                           │
│  - Manages audio streams                                   │
│  - Calls Python LLM service                                │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ HTTP POST
                 ↓
┌─────────────────────────────────────────────────────────────┐
│           Python LLM Service (port 5000)                    │
│  - FastAPI server                                          │
│  - OpenAI integration with documents                       │
│  - Custom knowledge base                                   │
└─────────────────────────────────────────────────────────────┘
```

## ✨ Features

- ✅ Voice-to-voice conversation
- ✅ Custom Python LLM with documents
- ✅ Uses OpenAI API (not locked to one provider)
- ✅ Document context for answers
- ✅ Gladia for accurate speech recognition
- ✅ ElevenLabs for natural voice responses
- ✅ Real-time transcript display
- ✅ Easy to customize

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| Python service won't start | Run `pip install -r requirements.txt` |
| "Connection refused" error | Make sure Python service is running |
| No response from AI | Check OpenAI API key in .env files |
| Blank transcript | Check browser console for errors |
| Port already in use | Kill process or change port number |

## 🚀 Quick Commands

```powershell
# Python service
cd poc\python_service
python main.py

# Micdrop POC
cd poc
pnpm dev

# Install Python deps
pip install -r requirements.txt

# Check Python service health
curl http://127.0.0.1:5000/health
```

## 📖 Next Steps

1. **Customize documents** in `poc/python_service/main.py`
2. **Add more context** to improve AI responses
3. **Test voice conversation** and refine prompts
4. **Deploy** Python service to production server

---

**Everything is set up and ready to go!** 🎉

Run both services and start talking to your custom AI! 🎤
