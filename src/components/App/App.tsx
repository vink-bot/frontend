import Layout from '../Layout/Layout';
import ButtonChatOpen from '../ButtonChatOpen/ButtonChatOpen';
import Header from '../Header/Header';
import PopularQuestionsBox from '../PopularQuestionsBox/PopularQuestionsBox';
import Messages from '../Messages/Messages';
import Footer from '../Footer/Footer';

function App() {
  //const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="h-screen relative">
      <Layout>
        <Header />
        <PopularQuestionsBox />
        <Messages />
        <Footer />
      </Layout>
      <ButtonChatOpen />
    </main>
  );
}

export default App;
