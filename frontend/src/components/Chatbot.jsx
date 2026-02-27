import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import api from '../api/axios';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Namaste! I am KrishiAI. How can I help with your farm today?' }]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const res = await api.post('/chat', { question: input });
      setMessages([...newMessages, { sender: 'bot', text: res.data.answer }]);
    } catch (error) {
      setMessages([...newMessages, { sender: 'bot', text: 'Sorry, I am having trouble connecting to the server right now.' }]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white w-80 h-96 rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-green-600 text-white p-4 flex justify-between items-center">
            <h3 className="font-bold flex items-center gap-2"><MessageCircle size={18}/> KrishiAI Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="hover:text-green-200"><X size={20}/></button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`p-3 rounded-lg max-w-[85%] text-sm ${msg.sender === 'user' ? 'bg-green-100 text-green-900 self-end rounded-br-none' : 'bg-white border border-gray-200 text-gray-800 self-start rounded-bl-none'}`}>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about crops, weather..." 
              className="flex-1 border border-gray-300 rounded-full px-4 text-sm focus:outline-none focus:border-green-500"
            />
            <button onClick={handleSend} className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700">
              <Send size={16} />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-green-600 text-white p-4 rounded-full shadow-xl hover:bg-green-700 transition-transform hover:scale-105"
        >
          <MessageCircle size={28} />
        </button>
      )}
    </div>
  );
};

export default Chatbot;