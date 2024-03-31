import Avatar from '../../entities/Avatar/Avatar.tsx';
import ButtonChatClose from '../../features/Button/ChatClose/ButtonChatClose.tsx';

const Header = () => {
  return (
    <div className="header flex items-center justify-between bg-yellow px-3 py-2">
      <Avatar />
      <ButtonChatClose />
    </div>
  );
};

export default Header;