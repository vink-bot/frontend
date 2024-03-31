import { useDispatch } from 'react-redux';
import {
  openPopup,
  useGetOpenPopup,
} from '../../app/store/slices/popupSlice.ts';
import type { PopupType } from '../../app/store/slices/popupSlice.ts';

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
