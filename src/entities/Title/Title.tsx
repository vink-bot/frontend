import ChatBotIcon from '../../shared/images/icons/chatbot.svg';

const Title = () => {
  return (
    <div className="flex gap-2 items-center">
      <img className="min-w-6 h-6" src={ChatBotIcon} alt="ChatBot" />
    </div>
  );
};

export default Title;
