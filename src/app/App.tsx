import ChatPopup from '../pages/ChatPopup/ChatPopup';
import ButtonChatOpen from '../features/Buttons/ChatOpen/ButtonChatOpen';
import '../app/styles/index.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = 'Vink chat';
  }, []);
  return (
    <main className="h-screen relative">
      <ChatPopup />
      <ButtonChatOpen />
    </main>
  );
}

export default App;
