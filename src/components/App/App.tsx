import Layout from '../Layout/Layout';
import ButtonChatOpen from '../ButtonChatOpen/ButtonChatOpen';
import Header from '../Header/Header';
import PopularQuestionsBox from '../PopularQuestionsBox/PopularQuestionsBox';
import BoxMessages from '../BoxMessages/BoxMessages.tsx';
import Footer from '../Footer/Footer';

function App() {
  //const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="h-screen relative">
      <Layout>
        <Header />
        <PopularQuestionsBox />
        <BoxMessages />
        <Footer />
      </Layout>
      <ButtonChatOpen />
    </main>
  );
}

export default App;
