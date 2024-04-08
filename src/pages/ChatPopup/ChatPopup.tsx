import usePopup from '../../shared/lib/hooks/usePopup';
import WindowTitle from '../../widgets/WindowTitle/WindowTitle';
import PopularQuestionsBox from '../../widgets/PopularQuestionsBox/PopularQuestionsBox';
import MessagesBox from '../../widgets/MessagesBox/MessagesBox';
import Footer from '../../widgets/Footer/Footer';
import useChatPopupLogic from '../../shared/lib/hooks/useChaLogic.ts';
import ChatLayout from '../../Layouts/ChatLayout/ChatLayout.tsx';

const ChatPopup = () => {
  const { isOpen } = usePopup('chatPopup');
  useChatPopupLogic();

  return (
    <ChatLayout isOpen={isOpen}>
      <WindowTitle />
      <PopularQuestionsBox />
      <MessagesBox />
      <Footer />
    </ChatLayout>
  );
};

export default ChatPopup;
