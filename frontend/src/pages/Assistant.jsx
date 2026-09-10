import React, { useState } from 'react';
import { Bot, Leaf, LoaderCircle, Send, Sparkles, User } from 'lucide-react';
import api from '../api/axios';

const quickQuestions = [
    'What should I do if rainfall is expected tomorrow?',
    'How can I improve soil nitrogen naturally?',
    'Which crop is suitable for this season?',
];

const Assistant = () => {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Namaste! I am KrishiAI. Ask me about crops, soil, weather or irrigation.' },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const askQuestion = async (question) => {
        const trimmedQuestion = question.trim();
        if (!trimmedQuestion || isLoading) return;

        const nextMessages = [...messages, { sender: 'user', text: trimmedQuestion }];
        setMessages(nextMessages);
        setInput('');
        setIsLoading(true);

        try {
            const response = await api.post('/chat', { question: trimmedQuestion });
            setMessages([...nextMessages, { sender: 'bot', text: response.data.answer || 'Please try asking that another way.' }]);
        } catch {
            setMessages([...nextMessages, { sender: 'bot', text: 'I could not reach the farming assistant. Please check that the backend is running and try again.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-gray-50 to-emerald-100 px-6 py-8 fade-in">
            <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col overflow-hidden rounded-3xl border border-white bg-white/75 shadow-2xl shadow-green-900/10 backdrop-blur-xl">
                <header className="flex items-center gap-4 border-b border-green-100 bg-gradient-to-r from-green-700 to-emerald-600 px-6 py-5 text-white">
                    <div className="rounded-2xl bg-white/20 p-3"><Bot size={26} /></div>
                    <div>
                        <h1 className="text-2xl font-black">KrishiAI Assistant</h1>
                        <p className="mt-1 text-sm font-medium text-green-100">Your practical farming partner</p>
                    </div>
                    <span className="ml-auto hidden items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold sm:flex"><span className="h-2 w-2 rounded-full bg-lime-300" /> Online</span>
                </header>

                <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50/70 p-6">
                    {messages.map((message, index) => (
                        <div key={`${message.sender}-${index}`} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                            {message.sender === 'bot' && <div className="rounded-xl bg-green-100 p-2 text-green-700"><Leaf size={17} /></div>}
                            <div className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${message.sender === 'user' ? 'rounded-br-sm bg-green-600 text-white' : 'rounded-bl-sm border border-gray-100 bg-white text-gray-700'}`}>
                                {message.text}
                            </div>
                            {message.sender === 'user' && <div className="rounded-xl bg-gray-200 p-2 text-gray-600"><User size={17} /></div>}
                        </div>
                    ))}
                    {isLoading && <div className="flex items-center gap-3 text-sm font-semibold text-gray-500"><div className="rounded-xl bg-green-100 p-2 text-green-700"><Sparkles size={17} /></div><span className="flex items-center gap-2">Thinking <LoaderCircle size={15} className="animate-spin" /></span></div>}
                </div>

                <div className="border-t border-gray-100 bg-white p-5">
                    <div className="mb-4 flex flex-wrap gap-2">
                        {quickQuestions.map((question) => <button key={question} type="button" onClick={() => askQuestion(question)} disabled={isLoading} className="rounded-full border border-green-200 bg-green-50 px-3 py-2 text-left text-xs font-bold text-green-700 transition hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-50">{question}</button>)}
                    </div>
                    <form onSubmit={(event) => { event.preventDefault(); askQuestion(input); }} className="flex gap-3">
                        <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about crops, weather, soil..." className="min-w-0 flex-1 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:bg-white" />
                        <button type="submit" disabled={isLoading || !input.trim()} aria-label="Send question" className="rounded-2xl bg-green-600 px-4 text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"><Send size={19} /></button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Assistant;