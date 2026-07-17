import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MessageCircle, X, Send, Sparkles, MessageSquareDot } from 'lucide-react';

export const LiveChat: React.FC = () => {
  const { chatOpen, setChatOpen, chatMessages, sendChatMessage } = useApp();
  const [inputText, setInputText] = useState('');
  const [showPromptPulse, setShowPromptPulse] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatOpen, chatMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(inputText);
    setInputText('');
  };

  const handleQuickChip = (chipText: string) => {
    sendChatMessage(chipText);
  };

  const chips = [
    'Check active Coupons',
    'Track my order status',
    'How do I log in as Admin?',
    'What is your return policy?'
  ];

  return (
    <div id="ppb-livechat" className="fixed bottom-6 right-6 z-40 font-sans">
      
      {/* Floating Launcher Action button */}
      {!chatOpen && (
        <button
          onClick={() => { setChatOpen(true); setShowPromptPulse(false); }}
          className="relative h-14 w-14 bg-[#FF6B00] hover:bg-orange-600 text-white rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer z-40 group"
          title="Live Chat Support"
        >
          <MessageCircle size={24} className="group-hover:rotate-6 transition-transform" />
          
          {/* Unread message pulse */}
          {showPromptPulse && (
            <>
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full animate-ping"></span>
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full border-2 border-white"></span>
            </>
          )}
        </button>
      )}

      {/* Chatbox Panel Interface */}
      {chatOpen && (
        <div className="w-[340px] sm:w-[380px] bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-50 animate-in fade-in slide-in-from-bottom-5">
          
          {/* Header */}
          <div className="bg-[#FF6B00] text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-full bg-white/25 flex items-center justify-center text-white">
                <MessageSquareDot size={18} />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm tracking-wide">PPBASKET Assistant</h4>
                <p className="text-[10px] text-orange-100 font-semibold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-pulse"></span> Online Support Active
                </p>
              </div>
            </div>
            <button 
              onClick={() => setChatOpen(false)}
              className="p-1 rounded-full hover:bg-white/20 transition-colors text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Message List Panel */}
          <div className="flex-1 p-4 h-[300px] overflow-y-auto space-y-4 bg-gray-50/40 dark:bg-zinc-900/10">
            {chatMessages.map((msg: any, idx: number) => {
              const isUser = msg.sender === 'user';
              return (
                <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                    isUser 
                      ? 'bg-[#FF6B00] text-white rounded-br-none' 
                      : 'bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-200 border border-gray-100/60 dark:border-zinc-850 rounded-bl-none'
                  }`}>
                    <p>{msg.text}</p>
                    <span className={`text-[9px] block text-right mt-1.5 ${isUser ? 'text-orange-200' : 'text-gray-400 font-medium'}`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick chip suggestions list */}
          {chatMessages.length === 1 && (
            <div className="p-3 border-t border-gray-50 dark:border-zinc-900/60 flex flex-wrap gap-1.5 bg-white dark:bg-zinc-950">
              {chips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickChip(chip)}
                  className="text-[10px] font-bold text-[#FF6B00] bg-orange-50 dark:bg-orange-950/20 px-2.5 py-1 rounded-full border border-orange-200/20 hover:bg-orange-100 dark:hover:bg-orange-950/40 transition-colors cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* Message Form input box */}
          <form onSubmit={handleSend} className="p-3 border-t border-gray-100 dark:border-zinc-900 flex gap-2 bg-white dark:bg-zinc-950">
            <input
              type="text"
              placeholder="Ask PPBASKET..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-gray-50 dark:bg-zinc-900 text-xs px-3.5 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500 text-gray-900 dark:text-white"
            />
            <button 
              type="submit"
              className="p-2 bg-[#FF6B00] hover:bg-orange-600 text-white rounded-xl flex items-center justify-center transition-colors cursor-pointer"
            >
              <Send size={15} />
            </button>
          </form>

        </div>
      )}

    </div>
  );
};
