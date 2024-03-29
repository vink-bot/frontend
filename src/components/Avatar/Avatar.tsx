import AiChatIcon from '../icons/ai-chat-icon.tsx';

const Avatar = () => {
  return (
    <div className="flex gap-2 items-center">
      <AiChatIcon className="min-w-6 h-6 object-cover" />

      <div className="flex flex-col">
        <h5 className="text-sm">Chat</h5>
        <p className="text-xs">Bot</p>
      </div>
    </div>
  );
};

export default Avatar;
