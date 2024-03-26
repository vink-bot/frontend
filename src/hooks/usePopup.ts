import { useDispatch } from 'react-redux';
import { openPopup, useGetOpenPopup } from '../store/slices/popupSlice';
import type { PopupType } from '../store/slices/popupSlice';

const usePopup = (popupType: PopupType) => {
  const dispatch = useDispatch();
  const { [popupType]: isOpen } = useGetOpenPopup();

  const handleOpenPopup = () => {
    dispatch(openPopup({ popupType, isOpen: true }));
  };

  const handleClosePopup = () => {
    dispatch(openPopup({ popupType, isOpen: false }));
  };

  return {
    isOpen,
    openPopup: handleOpenPopup,
    closePopup: handleClosePopup,
  };
};

export default usePopup;
