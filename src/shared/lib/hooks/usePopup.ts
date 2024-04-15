import { useDispatch } from 'react-redux';
import { openPopup, useGetOpenPopup } from '../../../app/store/slices/popupSlice';
import type { PopupType } from '../../../app/store/slices/popupSlice';

const usePopup = (popupType: PopupType) => {
  const dispatch = useDispatch();
  const { [popupType]: isOpen } = useGetOpenPopup();

  const handleOpenPopup = () => dispatch(openPopup({ popupType, isOpen: true }));

  const handleClosePopup = () => dispatch(openPopup({ popupType, isOpen: false }));

  return {
    isOpen,
    onOpenPopup: handleOpenPopup,
    onClosePopup: handleClosePopup,
  };
};

export default usePopup;
