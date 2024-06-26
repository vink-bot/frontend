import React from 'react';
import { cn } from '../../lib/utils/utils';
import { IMessageRedux } from '../../../app/store/slices/chatMessagesSlice';

const MemoizedAppMessage: React.FC<{ message: IMessageRedux }> = ({ message }) => {
  const isMyMsg = message.type === 'USER';
  const isError = message.type === 'ERROR';

  return (
    <div className={cn('flex gap-2 items-center w-full animate-fadeInMessage', 'justify-end', (!isMyMsg || isError) && 'flex-row-reverse')}>
      <time className="text-xs" dateTime={message.dateCreate.fullDate}>
        {message.dateCreate.hoursMinutes}
      </time>
      <div className={cn('break-anywhere rounded-md p-2 text-sm shadow-md bg-white', isMyMsg && 'bg-yellow', isError && 'bg-red-300')}>{message.message}</div>
    </div>
  );
};

const AppMessage = React.memo(MemoizedAppMessage);
export default AppMessage;
