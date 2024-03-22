import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type MessagesContextType = {
  messages: MessageType[];
  updateMessages: () => void;
};

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

export const useMessages = () => {
  const context = useContext(MessagesContext);

  if (!context) {
    throw new Error('You forgot provider');
  }

  return context;
};

type MessageType = {
  id: string;
  author: string;
  text: string;
};

export const MessagesProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    setMessages(JSON.parse(localStorage.getItem('messages') ?? '[]'));
  }, []);

  const updateMessages = () => {
    const messages = JSON.parse(localStorage.getItem('messages') ?? '[]');
    setMessages(messages);
  };

  return (
    <MessagesContext.Provider
      value={{
        messages,
        updateMessages,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};
