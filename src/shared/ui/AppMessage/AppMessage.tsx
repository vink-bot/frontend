import React from 'react';
import { IMessage } from '../../../app/store/slices/chatSlice';
import { cn } from '../../lib/utils/utils.ts';

const AppMessage: React.FC<{ message: IMessage }> = ({ message }) => {
  const isMyMsg = message.type === 'USER';

  return (
    <div
      className={cn(
        'flex gap-2 items-center w-full animate-fadeInWord',
        'justify-end',
        !isMyMsg && 'flex-row-reverse'
      )}
    >
      <time className="text-xs" dateTime={message.date.fullDate}>
        {message.date.hoursMinutes}
      </time>
      <div
        className={cn(
          'break-anywhere rounded-md p-2 text-sm shadow-md bg-white',
          isMyMsg && 'bg-yellow'
        )}
      >
        {message.message}
      </div>
    </div>
  );
};

export default AppMessage;
