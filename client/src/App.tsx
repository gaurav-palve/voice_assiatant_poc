import React, { useState, useEffect } from 'react'
import { Micdrop } from '@micdrop/client'
import { useMicdropState } from '@micdrop/react'

export default function App() {
  const { isStarted, isMicStarted, callState, conversation } = useMicdropState()
  const [error, setError] = useState<string | null>(null)

  const handleStartMic = async () => {
    try {
      setError(null)
      await Micdrop.startMic({ vad: ['silero', 'volume'] })
    } catch (err) {
      setError(`Mic error: ${err}`)
    }
  }

  const handleStart = async () => {
    try {
      setError(null)
      await Micdrop.start({
        url: 'ws://localhost:8081/call',
        debugLog: true,
      })
    } catch (err) {
      setError(`Start error: ${err}`)
    }
  }

  const handleStop = async () => {
    try {
      setError(null)
      await Micdrop.stop()
    } catch (err) {
      setError(`Stop error: ${err}`)
    }
  }

  const handleStopMic = async () => {
    try {
      setError(null)
      Micdrop.mute()
    } catch (err) {
      setError(`Mic stop error: ${err}`)
    }
  }

  const renderMessage = (item: (typeof conversation)[0], index: number) => {
    switch (item.role) {
      case 'user':
      case 'assistant':
        return (
          <div
            key={index}
            className={`message ${item.role}`}
          >
            <div className="message-header">
              {item.role === 'user' ? '👤 You' : '🤖 AI'}
            </div>
            <div className="message-text">{item.content}</div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="app">
      <header>
        <h1>🎤 Micdrop POC</h1>
        <p>Voice-to-Voice AI Assistant</p>
      </header>

      <main>
        {/* Status Section */}
        <section className="status">
          <h2>Status</h2>
          <div className="status-items">
            <div className={`status-item ${isMicStarted ? 'active' : ''}`}>
              <span>🎙️ Microphone:</span>
              <span>{isMicStarted ? 'ON' : 'OFF'}</span>
            </div>
            <div className={`status-item ${isStarted ? 'active' : ''}`}>
              <span>💬 Call:</span>
              <span>{isStarted ? 'ACTIVE' : 'IDLE'}</span>
            </div>
            {callState && (
              <div className="status-item">
                <span>📊 State:</span>
                <span>{callState}</span>
              </div>
            )}
          </div>
        </section>

        {/* Error Section */}
        {error && (
          <section className="error-box">
            <strong>⚠️ Error:</strong> {error}
          </section>
        )}

        {/* Controls Section */}
        <section className="controls">
          <h2>Controls</h2>
          <div className="button-group">
            <button
              onClick={handleStartMic}
              disabled={isMicStarted}
              className="btn btn-primary"
            >
              🎤 Start Mic
            </button>
            <button
              onClick={handleStart}
              disabled={!isMicStarted || isStarted}
              className="btn btn-success"
            >
              ▶️ Start Call
            </button>
            <button
              onClick={handleStop}
              disabled={!isStarted}
              className="btn btn-danger"
            >
              ⏹️ Stop Call
            </button>
            <button
              onClick={handleStopMic}
              disabled={!isMicStarted}
              className="btn btn-secondary"
            >
              🔇 Stop Mic
            </button>
          </div>
        </section>

        {/* Messages Section */}
        <section className="messages">
          <h2>Conversation</h2>
          <div className="messages-container">
            {conversation.length === 0 ? (
              <p className="empty-state">
                Start the mic and call to begin conversation...
              </p>
            ) : (
              conversation.map((item, index) => renderMessage(item, index))
            )}
          </div>
        </section>
      </main>

      <footer>
        <p>Powered by Micdrop • OpenAI LLM • Gladia STT • ElevenLabs TTS</p>
      </footer>
    </div>
  )
}