'use client';

import { useState } from 'react';
import ChatLayout from '@/components/layout/ChatLayout';
import Sidebar from '@/components/chat/Sidebar';
import ChatWindow from '@/components/chat/ChatWindow';
import { User } from '@/types/chat';
import { motion } from 'framer-motion';

export default function Home() {
  const [selectedContact, setSelectedContact] = useState<User>();

  return (
    <ChatLayout>
      <Sidebar
        onSelectContact={setSelectedContact}
        selectedContact={selectedContact}
      />
      {selectedContact ? (
        <ChatWindow contact={selectedContact} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 flex items-center justify-center bg-gray-50"
        >
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Welcome to Chat App
            </h2>
            <p className="text-gray-500">
              Select a contact to start chatting
            </p>
          </div>
        </motion.div>
      )}
    </ChatLayout>
  );
}
