import { cn } from '../libs/utils.ts';
import { useMessages } from '../context/messages-context.tsx';

const Messages = () => {
  const { messages } = useMessages();

  return (
    <div className="p-3 flex flex-col gap-2">
      {messages.map((msg) => {
        const isMyMsg = msg.author === 'user';
        return (
          <div
            key={msg.id}
            className={cn(
              'rounded-md p-2 text-sm shadow-md w-fit flex',
              isMyMsg && 'bg-blue-light self-end'
            )}
          >
            {msg.text}
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
