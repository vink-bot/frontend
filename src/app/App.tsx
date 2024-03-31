import ChatPopup from '../widgets/ChatPopup/ChatPopup.tsx';
import ButtonChatOpen from '../features/Button/ChatOpen/ButtonChatOpen.tsx';
import '../app/styles/index.css';

function App() {
  return (
    <main className="h-screen relative">
      <ChatPopup />
      <ButtonChatOpen />
    </main>
  );
}

export default App;
