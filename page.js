'use client';

import { useChat } from 'ai/react';
import ReactMarkdown from 'react-markdown';
import { ArrowUp, Bot, User } from 'lucide-react';
import { useEffect, useRef } from 'react';
import './globals.css';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div className="header">✨ Nexus AI</div>
      
      <div className="chat-container">
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: '100px', color: '#888' }}>
            <h2 style={{ color: '#fff', fontSize: '28px', marginBottom: '16px' }}>What can I help you with?</h2>
            <p>I am powered by Llama 3 API.</p>
            <p>I can write code, analyze data, and help you learn.</p>
          </div>
        )}

        {messages.map(m => (
          <div key={m.id} className={`message-wrapper ${m.role === 'user' ? 'user' : 'ai'}`}>
            {m.role === 'assistant' && (
              <div style={{ marginRight: '16px', marginTop: '16px' }}>
                <Bot size={24} color="#888" />
              </div>
            )}
            <div className={`message ${m.role === 'user' ? 'user' : 'ai'}`}>
              <div className="message-content">
                {m.role === 'user' ? (
                  m.content
                ) : (
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <form onSubmit={handleSubmit} className="input-container">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Message Nexus AI..."
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !input.trim()} className="send-btn">
            <ArrowUp size={20} />
          </button>
        </form>
        <div style={{ textAlign: 'center', fontSize: '12px', color: '#666', marginTop: '12px' }}>
          AI can make mistakes. Always verify important information.
        </div>
      </div>
    </>
  );
}
