import AppButton from '../../../shared/ui/AppButton/AppButton.tsx';
import React from 'react';
import useChatConfig from '../../../shared/lib/hooks/useChatConfig.ts';

const ButtonPopularQuestionsToggle: React.FC = () => {
  const { onSetFocus } = useChatConfig();
  const handleClick = () => {
    onSetFocus(false);
  };
  return (
    <AppButton
      border={'border-none'}
      color={'transparent'}
      size={'full'}
      onClick={handleClick}
      classNameButton="visible animate-fadeIn h-full flex justify-between items-center p-3 cursor-pointer hover:opacity-0 border-b"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-orange animate-bounce">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
      </svg>
      Популярные вопросы
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-orange animate-bounce">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
      </svg>
    </AppButton>
  );
};

export default ButtonPopularQuestionsToggle;
