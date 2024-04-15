import Title from '../../entities/Title/Title';
import ButtonChatClose from '../../features/Buttons/ChatClose/ButtonChatClose';

const WindowTitle = () => {
  return (
    <div className="flex items-center justify-between rounded-tl-md rounded-tr-md px-3 py-2 header bg-yellow">
      <Title />
      <ButtonChatClose />
    </div>
  );
};

export default WindowTitle;
