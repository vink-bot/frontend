import ChatBotIcon from '../../shared/images/icons/chatbot.svg';

const Avatar = () => {
  return (
    <div className="flex gap-2 items-center">
      <img className="min-w-6 h-6" src={ChatBotIcon} alt="ChatBot" />

      <div className="flex flex-col">
        <h5 className="text-sm">Chat</h5>
        <p className="text-xs">Bot</p>
      </div>
    </div>
  );
};

export default Avatar;
