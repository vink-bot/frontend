import usePopup from '../../shared/lib/hooks/usePopup';
import { cn } from '../../shared/lib/utils/utils';
import WindowTitle from '../../widgets/WindowTitle/WindowTitle';
import PopularQuestionsBox from '../../widgets/PopularQuestionsBox/PopularQuestionsBox';
import MessagesBox from '../../widgets/MessagesBox/MessagesBox';
import Footer from '../../widgets/Footer/Footer';
import useChatPopupLogic from '../../shared/lib/hooks/useChaLogic.ts';

const ChatPopup = () => {
  const { isOpen } = usePopup('chatPopup');
  useChatPopupLogic();

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
