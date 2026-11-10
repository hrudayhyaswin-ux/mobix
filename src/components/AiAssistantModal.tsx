import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Bot, Send, Sparkles, User, X } from 'lucide-react';

interface ChatMessage {
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const AiAssistantModal: React.FC = () => {
  const { isAiAssistantOpen, setIsAiAssistantOpen } = useAuth();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: 'Hello Hruday! I am MOBILIX AI — your intelligent urban transport guide. Ask me about routes, EV charger availability, parking spots, or traffic predictions.',
      time: 'Just now'
    }
  ]);
  const [loading, setLoading] = useState(false);

  if (!isAiAssistantOpen) return null;

  const handleSend = async (questionText?: string) => {
    const q = questionText || input;
    if (!q.trim()) return;

    const userMsg: ChatMessage = { sender: 'user', text: q, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    if (!questionText) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q })
      });
      const data = await res.json();
      const aiAnswer = data.answer || "I can guide you across all city routes, EV charging, and live metro schedules.";

      setTimeout(() => {
        setMessages(prev => [...prev, {
          sender: 'ai',
          text: aiAnswer,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
        setLoading(false);
      }, 500);

    } catch (err) {
      setMessages(prev => [...prev, {
        sender: 'ai',
        text: "Recommended: Take the Electric Metro Blue Line to HITEC City. It saves 18 mins and 3.8 kg CO₂ compared to standard driving.",
        time: 'Just now'
      }]);
      setLoading(false);
    }
  };

  const samplePrompts = [
    "How do I get to the airport?",
    "What is the cheapest way to reach college?",
    "Where is the nearest EV charger?",
    "Why is my usual route slower today?",
    "How much CO₂ did I save this month?"
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
      
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <Bot className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-white flex items-center gap-1.5">
              <span>MOBILIX AI</span>
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            </h4>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Connected to Smart City Engine
            </span>
          </div>
        </div>

        <button 
          onClick={() => setIsAiAssistantOpen(false)}
          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.sender === 'ai' && (
              <div className="w-7 h-7 rounded-lg bg-indigo-600/30 text-indigo-400 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-4 h-4" />
              </div>
            )}
            <div className={`max-w-[80%] rounded-2xl p-3.5 text-xs font-medium leading-relaxed shadow-sm ${
              m.sender === 'user' 
                ? 'bg-cyan-600 text-white rounded-tr-none' 
                : 'bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700/80 whitespace-pre-line'
            }`}>
              {m.text}
              <div className={`text-[9px] mt-1 ${m.sender === 'user' ? 'text-cyan-200' : 'text-slate-400'}`}>
                {m.time}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold p-2">
            <Bot className="w-4 h-4 animate-spin" />
            <span>MOBILIX AI is analyzing city transport sensors...</span>
          </div>
        )}
      </div>

      {/* Suggested Quick Prompts */}
      <div className="p-3 bg-slate-950/60 border-t border-slate-800/80">
        <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">Suggested Questions:</div>
        <div className="flex flex-wrap gap-1.5">
          {samplePrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSend(p)}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/80 text-indigo-300 border border-indigo-500/20 hover:border-indigo-400 hover:text-white transition"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <div className="p-4 border-t border-slate-800 bg-slate-950">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask MOBILIX AI anything..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-medium"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/30"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
