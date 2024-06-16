import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '../store.hooks.ts';


// Интерфейс для описания типов всплывающего окна
export type PopupType = 'chatPopup';

// Тип для определения состояния всплывающего окна
interface IPopup {
  isOpen: Record<PopupType, boolean>;
}

// Начальное состояние всплывающего окна
const initialState: IPopup = {
  isOpen: {
    chatPopup: false,
  },
};

// Создание среза состояния для управления всплывающим окном
const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    // Действие для открытия или закрытия всплывающего окна
    openPopup: (state, action: PayloadAction<{ popupType: PopupType; isOpen: boolean }>) => {
      const { popupType, isOpen } = action.payload;
      // Обновление состояния всплывающего окна
      state.isOpen[popupType] = isOpen;
    },
  },
});
//Экспорт селекторов
export const useGetOpenPopup = () => useAppSelector((state) => state.popup.isOpen);
// Экспорт действий
export const { openPopup } = popupSlice.actions;
// Экспорт редьюсера
export default popupSlice.reducer;
