import AiChatIcon from '../icons/ai-chat-icon.tsx';
import { useState } from 'react';
import ChatLayout from '../chat-layout.tsx';
import { cn } from '../../libs/utils.ts';
import XIcon from '../icons/x-icon.tsx';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="h-screen relative">
      <ChatLayout isOpen={isOpen} setIsOpen={setIsOpen} />

      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className={cn(
          'fixed bottom-12 right-8 rounded-full p-6 w-6 h-6 flex items-center justify-center bg-yellow hover:opacity-70 transition-all duration-300 md:opacity-100 md:visible',
          isOpen && 'opacity-0 invisible'
        )}
      >
        {isOpen ? (
          <XIcon className="min-w-3 h-3 object-cover" />
        ) : (
          <AiChatIcon className="min-w-6 h-6 object-cover" />
        )}
      </button>
    </main>
  );
}

export default App;
