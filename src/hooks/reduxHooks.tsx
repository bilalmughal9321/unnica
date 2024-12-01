import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {RootState, AppDispatch} from '../redux/store'; // Correct path to your store file

// Custom hook to use the Redux dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

// Custom hook to use the Redux state selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
