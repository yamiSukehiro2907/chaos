import {type TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import type {RootDispatch, RootState} from "@/redux/store.ts";

export const useAppDispatch: () => RootDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;