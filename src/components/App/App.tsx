import ChatPopup from '../ChatPopup/ChatPopup.tsx';
import ButtonChatOpen from '../Button/ChatOpen/ButtonChatOpen';
import Header from '../Header/Header';
import PopularQuestionsBox from '../PopularQuestionsBox/PopularQuestionsBox';
import MessagesBox from '../MessagesBox/MessagesBox.tsx';
import Footer from '../Footer/Footer';

function App() {
  return (
    <main className="h-screen relative">
      <ChatPopup>
        <Header />
        <PopularQuestionsBox />
        <MessagesBox />
        <Footer />
      </ChatPopup>
      <ButtonChatOpen />
    </main>
  );
}

export default App;
