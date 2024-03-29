import XIcon from '../../icons/x-icon.tsx';
import usePopup from '../../../hooks/usePopup.ts';

const MyComponent = () => {
  const { closePopup: closeChatPopup } = usePopup('chatPopup');
  return (
    <button
      onClick={() => closeChatPopup()}
      type="button"
      className="transition-all duration-300 hover:opacity-50"
    >
      <XIcon className="w-3 h-3 object-cover" />
    </button>
  );
};

export default MyComponent;
