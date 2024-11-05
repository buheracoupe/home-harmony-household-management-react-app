import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./Store";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();