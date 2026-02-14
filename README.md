# Micdrop POC - Voice-to-Voice AI Assistant

A simple **Proof of Concept** for a voice-to-voice AI conversation application using Micdrop, OpenAI, and React.

## 📋 What is This?

This POC demonstrates:
- ✅ **Real-time voice input** from microphone
- ✅ **Speech-to-Text (STT)** using Gladia API
- ✅ **LLM Processing** using OpenAI GPT models
- ✅ **Text-to-Speech (TTS)** using ElevenLabs API
- ✅ **Voice Activity Detection (VAD)** for automatic speech detection
- ✅ **WebSocket communication** between client and server
- ✅ **Beautiful React UI** with conversation display

## 📁 Project Structure

```
poc/
├── server/                 # Backend server
│   ├── src/
│   │   ├── index.ts       # Server initialization & Fastify setup
│   │   └── call.ts        # WebSocket call handler
│   ├── .env               # Environment variables
│   ├── package.json       # Dependencies
│   └── tsconfig.json      # TypeScript config
│
└── client/                 # Frontend client
    ├── src/
    │   ├── index.tsx      # React entry point
    │   ├── App.tsx        # Main UI component
    │   └── index.css      # Styles
    ├── public/
    │   └── index.html     # HTML template
    ├── package.json       # Dependencies
    ├── tsconfig.json      # TypeScript config
    └── vite.config.ts     # Vite configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (package manager)
- OpenAI API Key (with GPT, Whisper, and TTS access)

### Step 1: Setup Environment

1. Go to the monorepo root:
   ```powershell
   cd c:\Users\gaurav.palve\Desktop\testing_gaurav\micdrop
   ```

2. Install all dependencies:
   ```powershell
   pnpm install
   ```

3. Build all packages:
   ```powershell
   pnpm build
   ```

### Step 2: Run the POC

Option A - **Run both server and client together** (Recommended):

```powershell
cd poc
pnpm dev
```

Option B - **Run separately** (for debugging):

Terminal 1 - Server:
```powershell
cd poc/server
pnpm dev
```

Terminal 2 - Client:
```powershell
cd poc/client
pnpm dev
```

### Step 3: Use the Application

1. Open your browser: **http://localhost:8080**

2. **Allow microphone access** when prompted

3. Click **"🎤 Start Mic"** button

4. Click **"▶️ Start Call"** button

5. **Speak naturally** to the AI:
   - The app listens for speech
   - Sends audio to OpenAI STT
   - Processes with OpenAI LLM
   - Responds with OpenAI TTS
   - Audio plays back automatically

6. Click **"⏹️ Stop Call"** to end conversation

## 🔧 Configuration

### Server Configuration

Edit `poc/server/.env`:

```env
# OpenAI API Key for LLM (required)
OPENAI_API_KEY=sk-proj-your-key-here

# Gladia API Key for Speech-to-Text (required)
GLADIA_API_KEY=your-gladia-key-here

# ElevenLabs API Key for Text-to-Speech (required)
ELEVENLABS_API_KEY=your-elevenlabs-key-here
ELEVENLABS_VOICE_ID=nPczCjzI2devNBz1zQrb

# Server port (optional, defaults to 8081)
PORT=8081
```

### Client Configuration

The client connects to the server via WebSocket at `ws://localhost:8081/call`.

To change the server URL, modify `poc/client/src/App.tsx`:

```typescript
Micdrop.init({
  serverUrl: 'ws://localhost:8081/call',  // Change this
  autoGainControl: true,
  noiseSuppression: true,
})
```

## 📊 What Each File Does

### Server Side

**`poc/server/src/index.ts`**
- Initializes Fastify server
- Registers WebSocket plugin
- Starts listening on port 8081

**`poc/server/src/call.ts`**
- Handles WebSocket connections
- Creates OpenAI LLM agent
- Creates Gladia STT agent
- Creates ElevenLabs TTS agent
- Manages MicdropServer instance
- Processes voice conversations

### Client Side

**`poc/client/src/index.tsx`**
- React entry point
- Renders App component to DOM

**`poc/client/src/App.tsx`**
- Main UI component
- Initializes Micdrop client
- Handles button clicks (Start Mic, Start Call, etc.)
- Displays conversation messages
- Shows connection status

**`poc/client/src/index.css`**
- Beautiful gradient design
- Responsive layout
- Message styling
- Button animations

## 🎯 Features

- ✨ **Voice Activity Detection** - Automatically detects when user stops speaking
- 🎙️ **Microphone Control** - Start/stop microphone on demand
- 💬 **Live Conversation** - Real-time message display
- 📊 **Status Display** - Shows mic and call status
- 🎨 **Beautiful UI** - Modern purple gradient design
- 📱 **Responsive** - Works on mobile and desktop
- ⚡ **Fast** - Uses WebSocket for low-latency communication

## 🐛 Troubleshooting

### "Server not found" error in browser console

**Solution:** Make sure the server is running on port 8081. Check the PowerShell terminal.

### Microphone not working

**Solutions:**
1. Check browser permission (allow microphone access)
2. Check Windows sound settings
3. Try a different browser
4. Restart the application

### "Invalid API Key" error

**Solution:** Check your OpenAI API key in `poc/server/.env`. Ensure it has:
- GPT access
- Whisper (STT) access
- TTS access

### No audio response

**Solutions:**
1. Check speaker volume
2. Check browser speaker settings
3. Check OpenAI TTS is working (verify API key)

## 📚 API References

### OpenAI Services Used

- **GPT-4/3.5 Turbo** - Language model for conversation
- **Gladia API** - Speech-to-Text (STT)
- **ElevenLabs API** - Text-to-Speech with natural voices

### Micdrop Client Methods

```typescript
// Initialize
Micdrop.init({ serverUrl, autoGainControl, noiseSuppression })

// Microphone
Micdrop.startMic({ vad: ['silero', 'volume'] })
Micdrop.stopMic()

// Call
Micdrop.start()
Micdrop.stop()

// Events
Micdrop.on('message', handler)
Micdrop.off('message', handler)
```

## 💡 Next Steps / Enhancements

1. **Add System Prompt Customization** - Let users customize AI behavior
2. **Add Conversation History** - Save/load past conversations
3. **Add Language Selection** - Support multiple languages
4. **Add Voice Selection** - Choose different TTS voices
5. **Add Recording** - Save audio conversations
6. **Add Analytics** - Track usage and performance

## 📝 License

Same as parent Micdrop project.

## 🤝 Support

For issues or questions:
1. Check troubleshooting section above
2. Check Micdrop main README
3. Verify all dependencies are installed
4. Check all three API keys (OpenAI, Gladia, ElevenLabs) are valid

---

## 🔑 **API Keys Used**

- **OpenAI** - Language Model (GPT-4/3.5 Turbo)
- **Gladia** - Speech-to-Text conversion
- **ElevenLabs** - Natural voice synthesis

All keys are pre-configured in `poc/server/.env`

---

**Your POC is ready! Start with `pnpm dev` from the `poc` folder.** 🎉

**Happy Voice Chatting! 🎤✨**
