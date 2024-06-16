import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import store, { AppDispatch } from './index.ts';

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
