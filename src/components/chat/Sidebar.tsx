import { useState } from 'react';
import { motion } from 'framer-motion';
import { User } from '@/types/chat';
import { dummyUsers, dummyMessages } from '@/utils/dummy-data';
import { getColorForUser } from '@/utils/colors';

interface SidebarProps {
  onSelectContact: (user: User) => void;
  selectedContact?: User;
}

export default function Sidebar({ onSelectContact, selectedContact }: SidebarProps) {
  const [contacts] = useState<User[]>(dummyUsers);

  const getLastMessage = (userId: string) => {
    const messages = dummyMessages[userId];
    return messages?.[messages.length - 1];
  };

  const getTimeString = (date: Date) => {
    const today = new Date();
    const messageDate = new Date(date);
    
    // Use fixed locale and options for consistent formatting
    const timeOptions: Intl.DateTimeFormatOptions = { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    };
    
    if (messageDate.toDateString() === today.toDateString()) {
      return messageDate.toLocaleTimeString('en-US', timeOptions);
    }
    
    if (messageDate.getTime() > today.getTime() - 86400000) {
      return 'Yesterday';
    }
    
    if (messageDate.getTime() > today.getTime() - 518400000) { // Within last week
      return messageDate.toLocaleDateString('en-US', { weekday: 'long' });
    }
    
    // Use consistent date format
    return messageDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="w-full md:w-80 bg-white border-r border-gray-100 h-full overflow-y-auto">
      {/* Header */}
      <div className="p-3 md:p-4 border-b border-gray-100">
        <h1 className="text-lg md:text-xl font-semibold text-[#1a1a1a]">Chats</h1>
      </div>

      {/* Contact List */}
      <div className="divide-y divide-gray-100">
        {contacts.map((contact) => {
          const lastMessage = getLastMessage(contact.id);
          const { bg, text } = getColorForUser(contact.id);
          return (
            <motion.div
              key={contact.id}
              whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
              onClick={() => onSelectContact(contact)}
              className={`flex items-center p-3 md:p-4 cursor-pointer ${
                selectedContact?.id === contact.id ? 'bg-gray-50' : ''
              }`}
            >
              <div className="relative">
                <div 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-medium text-sm md:text-base"
                  style={{ backgroundColor: bg, color: text }}
                >
                  {contact.id}
                </div>
                {contact.status === 'online' && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {contact.name}
                  </h3>
                  {lastMessage && (
                    <span className="text-xs text-gray-500 ml-2">
                      {getTimeString(lastMessage.timestamp)}
                    </span>
                  )}
                </div>
                {lastMessage && (
                  <p className="text-xs md:text-sm text-gray-500 truncate">
                    {lastMessage.content}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
} 