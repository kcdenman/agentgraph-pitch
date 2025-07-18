import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

function ChatUI() {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<{role: string; content: string}[]>([]);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!msg.trim() || loading) return;
    
    const userMessage = msg.trim();
    setHistory(h => [...h, {role: 'user', content: userMessage}]);
    setMsg('');
    setLoading(true);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ msg: userMessage })
      });
      const { answer } = await response.json();
      setHistory(h => [...h, {role: 'assistant', content: answer}]);
    } catch (error) {
      setHistory(h => [...h, {role: 'assistant', content: 'Sorry, I encountered an error. Please try again.'}]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-mint text-brand-black shadow-mint hover:shadow-lg rounded-full p-3 focus:outline-none transition-all duration-200"
        aria-label="Open AgentGraph AI Chat"
      >
        🤖
      </button>

      {open && (
        <div className="absolute bottom-16 right-0 w-80 bg-brand-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-mint text-brand-black px-4 py-3 font-semibold">
            AgentGraph AI
          </div>
          
          <div className="h-48 overflow-y-auto p-4 space-y-3 text-sm">
            {history.length === 0 && (
              <p className="text-gray-500 text-center mt-8">
                Ask me anything about AgentGraph!
              </p>
            )}
            {history.map((m,i)=>(
              <div key={i} className={`flex ${m.role==='user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-lg ${
                  m.role==='user' 
                    ? 'bg-mint text-brand-black' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <form onSubmit={send} className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <input
                className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-mint focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
                value={msg}
                onChange={e=>setMsg(e.target.value)}
                placeholder="Ask about the deck..."
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!msg.trim() || loading}
                className="bg-mint text-brand-black px-4 py-2 rounded-lg hover:bg-mint-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default function initChatWidget() {
  // Create container for chat widget
  const container = document.createElement('div');
  container.className = 'fixed bottom-6 right-6 z-50';
  document.body.appendChild(container);

  // Render React component
  const root = createRoot(container);
  root.render(<ChatUI />);
  
  return root;
}
