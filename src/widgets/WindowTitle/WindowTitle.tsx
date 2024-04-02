import Title from '../../entities/Title/Title.tsx';
import ButtonChatClose from '../../features/Button/ChatClose/ButtonChatClose.tsx';

const WindowTitle = () => {
  return (
    <div className="header flex items-center justify-between bg-yellow px-3 py-2 rounded-tr-md rounded-tl-md">
      <Title />
      <ButtonChatClose />
    </div>
  );
};

export default WindowTitle;
