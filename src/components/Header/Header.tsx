import Avatar from '../Avatar/Avatar.tsx';
import XIcon from '../icons/x-icon.tsx';
import usePopup from '../../hooks/usePopup.ts';

const Header = () => {
  const { closePopup: closeChatPopup } = usePopup('chatPopup');
  return (
    <div className="header flex items-center justify-between bg-yellow px-3 py-2">
      <Avatar />

      <button
        onClick={() => closeChatPopup()}
        type="button"
        className="transition-all duration-300 hover:opacity-50"
      >
        <XIcon className="w-3 h-3 object-cover" />
      </button>
    </div>
  );
};

export default Header;
