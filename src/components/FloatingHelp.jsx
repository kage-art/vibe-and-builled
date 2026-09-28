import React, { useState } from 'react';
import { MessageSquare, X, Send, PhoneCall, Sparkles, Stethoscope, Clock, ShieldCheck, HeartPulse } from 'lucide-react';

export default function FloatingHelp({ onOpenSOS, onFindSpecialist }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I am your MedBridge Care Concierge. How can we support your health journey today?' }
  ]);
  const [inputText, setInputText] = useState('');

  const quickQuestions = [
    'How do I book an instant appointment?',
    'I have fever and headache, who to consult?',
    'How do MedBridge HealthCredits work?',
    'Emergency Trauma / Ambulance Dispatch'
  ];

  const handleSend = (textToSend = inputText) => {
    const text = textToSend.trim();
    if (!text) return;

    const userMsg = { sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      let reply = 'Our team and verified clinicians are ready to assist you.';
      const lower = text.toLowerCase();
      if (lower.includes('book') || lower.includes('appointment')) {
        reply = 'You can browse verified doctors in the Care Directory below, filter by specialty, and click "Book Appointment" to secure a slot instantly.';
      } else if (lower.includes('fever') || lower.includes('headache')) {
        reply = 'For viral symptoms and headache, we recommend booking a General Physician or Neurologist. Click "Connect to Care Now" on the hero banner for a direct symptom match!';
      } else if (lower.includes('credit')) {
        reply = 'MedBridge Dual-Credit Economy awards you +75 HealthCredits (₹75) whenever you complete a verified treatment, which can be redeemed on future appointments or generic medicines.';
      } else if (lower.includes('emergency') || lower.includes('ambulance') || lower.includes('sos')) {
        reply = 'For urgent emergencies, please use our 1-Click Trauma SOS button for real-time ~8 minute ambulance dispatch.';
      }

      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Trigger from Reference Mockup */}
      <div className="medbridge-floating-help-trigger">
        <div className="help-pill-tooltip" onClick={() => setIsOpen(true)}>
          <span className="help-tooltip-text">Need Help?</span>
        </div>
        <button 
          className="help-circle-button" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Need Help Support"
        >
          <MessageSquare size={20} color="#ffffff" />
          <span className="help-unread-dot"></span>
        </button>
      </div>

      {/* Interactive Care Concierge Modal / Drawer */}
      {isOpen && (
        <div className="help-chat-card">
          <div className="help-chat-header">
            <div className="concierge-profile">
              <div className="concierge-avatar">
                <HeartPulse size={18} color="#00a8cc" />
              </div>
              <div>
                <h4>MedBridge Care Concierge</h4>
                <div className="online-indicator">
                  <span className="green-dot"></span> 24/7 Verified Support
                </div>
              </div>
            </div>
            <button className="chat-close-btn" onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="help-emergency-banner" onClick={() => { onOpenSOS(); setIsOpen(false); }}>
            <PhoneCall size={16} color="#dc2626" />
            <div>
              <strong>Emergency SOS Helpline</strong>
              <span>Instant ambulance & trauma dispatch (~8 mins)</span>
            </div>
          </div>

          <div className="chat-messages-container">
            {messages.map((m, idx) => (
              <div key={idx} className={`chat-bubble ${m.sender === 'user' ? 'user-msg' : 'bot-msg'}`}>
                {m.text}
              </div>
            ))}
          </div>

          <div className="quick-suggestions-row">
            {quickQuestions.map((q, idx) => (
              <button key={idx} className="quick-q-chip" onClick={() => handleSend(q)}>
                {q}
              </button>
            ))}
          </div>

          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
            className="chat-input-bar"
          >
            <input 
              type="text" 
              placeholder="Ask about doctors, symptoms, booking..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button type="submit" className="send-btn" disabled={!inputText.trim()}>
              <Send size={15} />
            </button>
          </form>
        </div>
      )}

      <style>{`
        .medbridge-floating-help-trigger {
          position: fixed;
          bottom: 24px;
          right: 24px;
          display: flex;
          align-items: center;
          gap: 8px;
          z-index: 999;
          filter: drop-shadow(0 8px 20px rgba(0, 168, 204, 0.25));
        }

        .help-pill-tooltip {
          background: #ffffff;
          padding: 7px 14px;
          border-radius: 9999px;
          box-shadow: 0 4px 14px rgba(15, 23, 42, 0.1);
          border: 1px solid #e2e8f0;
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        .help-pill-tooltip:hover {
          transform: translateX(-2px);
        }

        .help-tooltip-text {
          font-size: 0.82rem;
          font-weight: 600;
          color: #0f172a;
          white-space: nowrap;
        }

        .help-circle-button {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #00a8cc; /* exact teal from reference */
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 0 6px 18px rgba(0, 168, 204, 0.35);
          cursor: pointer;
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .help-circle-button:hover {
          transform: scale(1.08);
          background: #0092b3;
        }

        .help-unread-dot {
          position: absolute;
          top: 3px;
          right: 3px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #ef4444;
          border: 2px solid #ffffff;
          animation: pulseRed 2s infinite;
        }

        @keyframes pulseRed {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        .help-chat-card {
          position: fixed;
          bottom: 84px;
          right: 24px;
          width: 360px;
          background: #ffffff;
          border-radius: 18px;
          box-shadow: 0 16px 40px rgba(15, 23, 42, 0.18);
          border: 1px solid #e2e8f0;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideUp 0.25s ease-out;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .help-chat-header {
          padding: 14px 16px;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .concierge-profile {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .concierge-avatar {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #eef8fa;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .concierge-profile h4 {
          font-size: 0.88rem;
          color: #0f172a;
          margin-bottom: 1px;
        }

        .online-indicator {
          font-size: 0.72rem;
          color: #059669;
          display: flex;
          align-items: center;
          gap: 4px;
          font-weight: 500;
        }

        .green-dot {
          width: 6px;
          height: 6px;
          background: #059669;
          border-radius: 50%;
        }

        .chat-close-btn {
          background: transparent;
          color: #94a3b8;
          border: none;
          cursor: pointer;
        }
        .chat-close-btn:hover {
          color: #0f172a;
        }

        .help-emergency-banner {
          background: #fef2f2;
          border-bottom: 1px solid #fee2e2;
          padding: 8px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: background 0.15s;
        }
        .help-emergency-banner:hover {
          background: #fee2e2;
        }
        .help-emergency-banner strong {
          display: block;
          font-size: 0.78rem;
          color: #dc2626;
        }
        .help-emergency-banner span {
          display: block;
          font-size: 0.68rem;
          color: #7f1d1d;
        }

        .chat-messages-container {
          padding: 14px;
          max-height: 240px;
          min-height: 180px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .chat-bubble {
          font-size: 0.82rem;
          line-height: 1.45;
          padding: 9px 13px;
          border-radius: 12px;
          max-width: 85%;
        }

        .bot-msg {
          background: #f1f5f9;
          color: #1e293b;
          align-self: flex-start;
          border-bottom-left-radius: 2px;
        }

        .user-msg {
          background: #00a8cc;
          color: #ffffff;
          align-self: flex-end;
          border-bottom-right-radius: 2px;
        }

        .quick-suggestions-row {
          padding: 6px 12px;
          display: flex;
          gap: 6px;
          overflow-x: auto;
          background: #ffffff;
          border-top: 1px solid #f1f5f9;
        }
        .quick-suggestions-row::-webkit-scrollbar {
          height: 3px;
        }

        .quick-q-chip {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          color: #475569;
          font-size: 0.72rem;
          padding: 4px 10px;
          border-radius: 9999px;
          white-space: nowrap;
          cursor: pointer;
        }
        .quick-q-chip:hover {
          background: #eef8fa;
          border-color: #bee3ea;
          color: #00a8cc;
        }

        .chat-input-bar {
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          background: #ffffff;
          border-top: 1px solid #e2e8f0;
        }

        .chat-input-bar input {
          flex: 1;
          border: 1px solid #cbd5e1;
          border-radius: 9999px;
          padding: 8px 14px;
          font-size: 0.82rem;
          outline: none;
        }
        .chat-input-bar input:focus {
          border-color: #00a8cc;
        }

        .send-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #00a8cc;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .send-btn:disabled {
          background: #cbd5e1;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
}
