import { cn } from '../libs/utils.ts';
import { useGetChatMessages } from '../store/slices/chatSlice.ts';

const Messages = () => {
  const messages = useGetChatMessages();

  return (
    <div className="p-3 flex flex-col gap-2">
      {messages.map((msg) => {
        const isMyMsg = msg.type === 'USER';
        return (
          <div
            key={msg.id}
            className={cn(
              'rounded-md p-2 text-sm shadow-md w-fit flex',
              isMyMsg && 'bg-blue-light self-end'
            )}
          >
            {msg.message}
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
