import usePopup from '../../shared/lib/hooks/usePopup.ts';
import { cn } from '../../shared/lib/utils/utils.ts';
import WindowTitle from '../../widgets/WindowTitle/WindowTitle.tsx';
import PopularQuestionsBox from '../../widgets/PopularQuestionsBox/PopularQuestionsBox.tsx';
import MessagesBox from '../../widgets/MessagesBox/MessagesBox.tsx';
import Footer from '../../widgets/Footer/Footer.tsx';

const ChatPopup = () => {
  const { isOpen } = usePopup('chatPopup');
  return (
    <div
      className={cn(
        'invisible opacity-0 md:max-w-80 w-full min-h-72 h-screen md:max-h-[70dvh] border flex-col rounded-md md:fixed bottom-28 -right-96 bg-white transition-all duration-300',
        isOpen && 'flex visible opacity-100 right-8'
      )}
    >
      <WindowTitle />
      <PopularQuestionsBox />
      <MessagesBox />
      <Footer />
    </div>
  );
};

export default ChatPopup;
