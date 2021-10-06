import { createContext, Dispatch } from "react";
import { AppointmentState } from "../models/appointment";
import { AppointmentAction } from "./mainReducer";

export interface ContextProps{
    state: AppointmentState,
    dispatch: Dispatch<AppointmentAction>
}


export const DataContext = createContext<ContextProps>({}as ContextProps);
