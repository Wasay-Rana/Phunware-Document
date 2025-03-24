import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, FileText, Search } from 'lucide-react';
import { useStore } from '../store';

const Chat: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { chatMessages, addChatMessage, extractedFiles } = useStore();
  const [selectedFile, setSelectedFile] = useState<string>('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = {
      id: Math.random().toString(36).substr(2, 9),
      content: message,
      timestamp: new Date(),
      isUser: true,
      context: {
        files: selectedFile === 'all' ? extractedFiles.map(f => f.name) : [selectedFile],
      },
    };

    addChatMessage(userMessage);
    setMessage('');
    setIsTyping(true);

    // Simulate LLM response
    const botMessage = {
      id: Math.random().toString(36).substr(2, 9),
      content: 'I\'ve analyzed the content of your files and found relevant information. Let me help you understand the data better.',
      timestamp: new Date(),
      isUser: false,
      context: {
        files: userMessage.context.files,
        relevantText: 'Sample extracted content from the files...',
      },
    };

    setTimeout(() => {
      setIsTyping(false);
      addChatMessage(botMessage);
    }, 2000);
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <select
            value={selectedFile}
            onChange={(e) => setSelectedFile(e.target.value)}
            className="block w-full pl-10 pr-4 py-2 rounded-lg border-gray-300 bg-gray-50 focus:border-indigo-500 focus:ring-indigo-500 text-sm transition-colors"
          >
            <option value="all">All Files</option>
            {extractedFiles.map((file) => (
              <option key={file.id} value={file.id}>
                {file.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-gray-50 to-white">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-2 ${
              msg.isUser ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div
              className={`flex items-start space-x-2 max-w-[70%] ${
                msg.isUser ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`p-3 rounded-2xl shadow-sm ${
                  msg.isUser
                    ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white'
                    : 'bg-white border border-gray-200 text-gray-900'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  {msg.isUser ? (
                    <User className="h-4 w-4 opacity-70" />
                  ) : (
                    <Bot className="h-4 w-4 text-indigo-600" />
                  )}
                  <span className="text-xs opacity-70">
                    {msg.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm leading-relaxed">{msg.content}</p>
                {msg.context?.relevantText && (
                  <div className="mt-2 text-xs bg-black/5 rounded-lg p-2">
                    <p className="opacity-70">{msg.context.relevantText}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-indigo-600" />
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200">
        <div className="flex space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about your files..."
            className="flex-1 rounded-lg border-gray-300 bg-gray-50 focus:border-indigo-500 focus:ring-indigo-500 text-sm transition-colors"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;