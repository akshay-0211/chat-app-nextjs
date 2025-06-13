import { User, Message, Chat } from '@/types/chat';

export const dummyUsers: User[] = [
  {
    id: 'EM',
    name: 'Emma Thompson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    status: 'online',
  },
  {
    id: 'MJ',
    name: 'Michael Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    status: 'online',
  },
  {
    id: 'SL',
    name: 'Sophia Lee',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia',
    status: 'online',
  },
  {
    id: 'RB',
    name: 'Robert Brown',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
    status: 'offline',
  },
  {
    id: 'AW',
    name: 'Amelia Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amelia',
    status: 'offline',
  },
  {
    id: 'DM',
    name: 'Daniel Martinez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel',
    status: 'offline',
  },
];

export const dummyMessages: Record<string, Message[]> = {
  'EM': [
    {
      id: '1',
      content: "I've sent you the latest project files.",
      senderId: 'EM',
      receiverId: 'CL',
      timestamp: new Date('2024-01-01T12:45:00'),
      status: 'delivered',
    },
  ],
  'MJ': [
    {
      id: '2',
      content: 'Are we still meeting for coffee today?',
      senderId: 'MJ',
      receiverId: 'CL',
      timestamp: new Date(Date.now() - 86400000), // Yesterday
      status: 'read',
    },
  ],
  'SL': [
    {
      id: '3',
      content: 'The design team loved your presentation!',
      senderId: 'SL',
      receiverId: 'CL',
      timestamp: new Date(Date.now() - 86400000), // Yesterday
      status: 'read',
    },
  ],
  'RB': [
    {
      id: '4',
      content: 'Can you review the budget proposal?',
      senderId: 'RB',
      receiverId: 'CL',
      timestamp: new Date(Date.now() - 172800000), // Tuesday
      status: 'read',
    },
  ],
  'AW': [
    {
      id: '5',
      content: 'Thanks for your help with the client meeting.',
      senderId: 'AW',
      receiverId: 'CL',
      timestamp: new Date(Date.now() - 259200000), // Monday
      status: 'read',
    },
  ],
  'DM': [
    {
      id: '6',
      content: "Let's schedule a call to discuss the timeline.",
      senderId: 'DM',
      receiverId: 'CL',
      timestamp: new Date('2024-05-25'),
      status: 'read',
    },
  ],
};

export const dummyChats: Chat[] = [
  {
    id: '1',
    participants: [dummyUsers[0], dummyUsers[1]],
    messages: dummyMessages['EM'],
    lastMessage: dummyMessages['EM'][dummyMessages['EM'].length - 1],
  },
  {
    id: '2',
    participants: [dummyUsers[0], dummyUsers[2]],
    messages: [],
  },
];

export const getCurrentUser = () => ({
  id: 'CL',
  name: 'Current User',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser',
  status: 'online',
}); 