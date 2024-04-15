import ChatBotIcon from '../../shared/images/icons/chatbot.svg';

const Title = () => {
  return (
    <div className="flex items-center gap-2">
      <img className="h-6 min-w-6" src={ChatBotIcon} alt="ChatBot" />
      Чат с vink.ru
    </div>
  );
};

export default Title;
