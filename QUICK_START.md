# 🚀 Quick Start - POC with Python LLM

## What You Have

✅ **Python LLM Service** - FastAPI + OpenAI with your documents
✅ **Node.js Server** - WebSocket server connecting everything
✅ **React Client** - Beautiful UI for voice conversation

---

## 🎯 Quick Start (3 Steps)

### **Step 1: Python Service**

Open **PowerShell #1:**

```powershell
cd poc\python_service
pip install -r requirements.txt
python main.py
```

✅ Should see: `Uvicorn running on http://127.0.0.1:5000`

---

### **Step 2: Micdrop POC**

Open **PowerShell #2:**

```powershell
cd poc
pnpm dev
```

✅ Should see:
```
[server] POC Server running on port 8081
[client] ➜  Local:   http://localhost:5173/
```

---

### **Step 3: Browser**

Open: **http://localhost:5173**

✅ You should see the Micdrop UI

---

## 🎤 Test It

1. Click **🎤 Start Mic**
2. Click **▶️ Start Call**
3. **Speak to AI** - Ask a question!
4. See transcript on screen
5. Hear AI response

---

## 📚 Add Your Documents

Edit `poc/python_service/main.py`:

```python
DOCUMENTS = """
Your company name and info here...

Your FAQ:
- Q: How do we help?
- A: ...

Your products:
- Product 1: Details
- Product 2: Details
"""
```

Restart Python service. Now AI knows about your stuff! 🚀

---

## 📊 What's Running

| Service | Port | Purpose |
|---------|------|---------|
| Python LLM | 5000 | Your custom LLM + docs |
| Node.js Server | 8081 | WebSocket hub |
| React Client | 5173 | Browser UI |

---

## ❌ If Something Goes Wrong

| Problem | Fix |
|---------|-----|
| "Module not found" | `pip install -r requirements.txt` |
| Port 5000 busy | Kill other process or change port |
| No AI response | Check Python service is running |
| API key error | Verify `.env` files have keys |

---

**That's it!** You now have a custom voice AI with your documents! 🎉

Try asking it questions about your company, products, or services!
