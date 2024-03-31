import { cn } from '../../shared/utils/utils.ts';
import usePopup from '../../shared/hooks/usePopup.ts';
import Header from '../Header/Header.tsx';
import PopularQuestionsBox from '../PopularQuestionsBox/PopularQuestionsBox.tsx';
import MessagesBox from '../MessagesBox/MessagesBox.tsx';
import Footer from '../Footer/Footer.tsx';

const ChatPopup = () => {
  const { isOpen } = usePopup('chatPopup');
  return (
    <div
      className={cn(
        'invisible opacity-0 md:max-w-80 w-full min-h-72 h-screen md:max-h-[70dvh] border flex-col rounded-md md:fixed bottom-28 -right-96 bg-white transition-all duration-300',
        isOpen && 'flex visible opacity-100 right-8'
      )}
    >
      <Header />
      <PopularQuestionsBox />
      <MessagesBox />
      <Footer />
    </div>
  );
};

export default ChatPopup;
