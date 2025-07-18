import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Copy, Check } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  isCode?: boolean;
  language?: string;
}

interface AIChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIChatbot: React.FC<AIChatbotProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // Use the isOpen prop to control the chat visibility
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Default model
  const selectedModel = 'gemini-1.5-flash';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const extractCodeInfo = (content: string) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)\n```/g;
    const match = codeBlockRegex.exec(content);
    if (match) {
      return {
        hasCode: true,
        language: match[1] || 'javascript',
        code: match[2].trim()
      };
    }
    return { hasCode: false, language: '', code: '' };
  };

  const formatMessage = (content: string) => {
    const { hasCode, language, code } = extractCodeInfo(content);
    
    if (!hasCode) {
      return <p className="whitespace-pre-line text-sm">{content}</p>;
    }

    return (
      <div className="w-full">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-80 h-[500px] flex flex-col overflow-hidden">
          {/* Chat header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold">AI Assistant</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>
          <pre className="m-0 p-3 overflow-x-auto text-sm">
            <code className={`language-${language || 'javascript'} text-gray-100`}>
              {code}
            </code>
          </pre>
          {content.replace(/```[\s\S]*?```/g, '').trim() && (
            <div className="mt-3">
              {content.split(/```[\s\S]*?```/g).map((part, i) => (
                part.trim() && <p key={i} className="whitespace-pre-line text-sm">{part}</p>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={() => handleCopy(code, 'code')}
          className="text-gray-300 hover:text-white p-1 rounded transition-colors"
          title="Copy to clipboard"
        >
          {copiedId === 'code' ? <Check className="text-green-400 w-3 h-3" /> : <Copy className="w-3 h-3" />}
        </button>
      </div>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          model: selectedModel,
          conversation_history: messages
            .filter((m) => !m.isUser)
            .map((m) => ({
              role: 'assistant',
              content: m.content,
            })),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response || 'I apologize, but I encountered an issue processing your request.',
        isUser: false,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        content: 'Sorry, I encountered an error. Please try again later.',
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col items-end space-y-4">
        {/* Chat Window */}
        {isOpen && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-96 max-h-[85vh] flex flex-col border border-gray-200 dark:border-gray-700 overflow-hidden transform transition-all duration-300 ease-in-out">
            {/* Chat header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <h3 className="font-semibold text-lg">AI Assistant</h3>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>



            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-gray-500">
                  <div className="mb-4">
                  </div>
                  <h3 className="text-xl font-medium mb-2 text-gray-700 dark:text-gray-300">
                    How can I help you today?
                  </h3>
                  <p className="max-w-md text-gray-500 dark:text-gray-400">
                    Ask me anything about programming, and I'll do my best to help with code examples and explanations.
                  </p>
                </div>
              ) : (
                <>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg p-3 ${
                          message.isUser
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-none'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
                        }`}
                      >
                        {formatMessage(message.content)}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start animate-fade-in">
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 rounded-bl-none">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                    placeholder="Type your message..."
                    className="w-full p-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    disabled={isLoading}
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={!input.trim() || isLoading}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
          {/* Message count badge */}
          {messages.length > 0 && !isOpen && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
              {messages.length > 99 ? '99+' : messages.length}
            </span>
          )}
      </div>
    </div>
  );
};

export default AIChatbot;