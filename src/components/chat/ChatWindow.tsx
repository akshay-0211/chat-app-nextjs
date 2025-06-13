import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Message } from '@/types/chat';
import { getCurrentUser, dummyMessages } from '@/utils/dummy-data';
import { getColorForUser } from '@/utils/colors';
import { SendHorizontal } from 'lucide-react';

interface ChatWindowProps {
  contact: User;
}

export default function ChatWindow({ contact }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(dummyMessages[contact.id] || []);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUser = getCurrentUser();
  const { bg, text } = getColorForUser(contact.id);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages(dummyMessages[contact.id] || []);
  }, [contact.id]);

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      senderId: currentUser.id,
      receiverId: contact.id,
      timestamp: new Date(),
      status: 'sent',
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage('');

    // Simulate bot reply
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Hi! This is a dummy reply from ${contact.name}`,
        senderId: contact.id,
        receiverId: currentUser.id,
        timestamp: new Date(),
        status: 'delivered',
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Chat Header */}
      <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-100 flex items-center">
        <div className="flex items-center">
          <div 
            className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-medium text-sm md:text-base"
            style={{ backgroundColor: bg, color: text }}
          >
            {contact.id}
          </div>
          <div className="ml-3">
            <h2 className="text-sm md:text-base font-medium text-gray-900">{contact.name}</h2>
            <p className="text-xs md:text-sm text-green-500">
              {contact.status === 'online' ? 'Online' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3 md:space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${
                message.senderId === currentUser.id ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-3 py-2 md:px-4 md:py-3 ${
                  message.senderId === currentUser.id
                    ? 'bg-[#5B45E0] text-white'
                    : 'bg-[#F3F4F6] text-gray-900'
                }`}
              >
                <p className="text-sm md:text-base">{message.content}</p>
                <div className={`text-[10px] md:text-xs mt-1 text-right ${
                  message.senderId === currentUser.id ? 'text-white/80' : 'text-gray-500'
                }`}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="px-4 md:px-6 py-3 md:py-4 border-t border-gray-100">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-[#F3F4F6] rounded-2xl px-3 py-2 md:px-4 md:py-3 focus:outline-none text-sm md:text-base text-gray-900 placeholder:text-gray-500"
          />
          <button
            type="submit"
            className="ml-3 md:ml-4 w-10 h-10 md:w-12 md:h-12 bg-[#5B45E0] text-white rounded-xl flex items-center justify-center hover:bg-[#4B3AC9] transition-colors"
          >
            <SendHorizontal className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </form>
      </div>
    </div>
  );
} 