import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { getCurrentUser } from '@/utils/dummy-data';

interface ChatLayoutProps {
  children: ReactNode;
}

export default function ChatLayout({ children }: ChatLayoutProps) {
  const currentUser = getCurrentUser();

  return (
    <div className="flex h-screen bg-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-1 w-full"
      >
        {/* Header - Fixed position for mobile and desktop */}
        <div className="fixed top-0 left-0 right-0 h-16 bg-white z-10 border-b border-gray-100 px-4 flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-xl md:text-2xl font-bold italic bg-blue-500 text-transparent bg-clip-text"
              style={{ fontFamily:"'Dancing Script', cursive" }}>
            ChatRelay
          </h1>

          {/* User Avatar */}
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#5B45E0] flex items-center justify-center text-white font-medium text-sm md:text-base">
            {currentUser.id}
          </div>
        </div>

        {/* Main Content - Adjusted for header height */}
        <div className="flex flex-1 w-full mt-16">
          {children}
        </div>
      </motion.div>
    </div>
  );
} 