import React from 'react';
import { cn } from '../../lib/utils/utils.ts';
import { IMessageRedux } from '../../../app/store/slices/chatMessagesSlice.ts';

const MemoizedAppMessage: React.FC<{ message: IMessageRedux }> = ({ message }) => {
  const isMyMsg = message.type === 'USER';

  return (
    <div className={cn('flex gap-2 items-center w-full animate-fadeInMessage', 'justify-end', !isMyMsg && 'flex-row-reverse')}>
      <time className="text-xs" dateTime={message.dateCreate.fullDate}>
        {message.dateCreate.hoursMinutes}
      </time>
      <div className={cn('break-anywhere rounded-md p-2 text-sm shadow-md bg-white', isMyMsg && 'bg-yellow')}>{message.message}</div>
    </div>
  );
};

const AppMessage = React.memo(MemoizedAppMessage);
export default AppMessage;
