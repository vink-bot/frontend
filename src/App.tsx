import AiChatIcon from './components/ai-chat-icon.tsx';
import { useState } from 'react';
import ChatLayout from './components/chat-layout.tsx';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="h-screen relative">
      <ChatLayout isOpen={isOpen} setIsOpen={setIsOpen} />

      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="fixed bottom-12 right-8 rounded-full p-6 w-6 h-6 flex items-center justify-center bg-yellow hover:opacity-70 transition-all duration-300"
      >
        <AiChatIcon className="min-w-6 h-6 object-cover" />
      </button>
    </main>
  );
}

export default App;
