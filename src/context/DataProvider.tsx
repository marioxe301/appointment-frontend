import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { AppointmentView } from '../models/appointment';
import {DataContext} from './DataContext';
import { INITIAL_STATE, mainReducer } from './mainReducer';

export const AppointmentURL: string = 'https://appointment-api-m.herokuapp.com/appointment';

interface props{
    children: JSX.Element | Array<JSX.Element>
};

export const DataProvider = ({children}:props) => {
    const [state, dispatch] = useReducer(mainReducer,INITIAL_STATE);

    useEffect(()=>{
        const getAppointments = async () =>{
            let response = await axios.get<AppointmentView[]>(AppointmentURL);
            dispatch({type:'getAppointments', payload: response.data});
        };
        getAppointments();
    },[]);
    
    return (
        <DataContext.Provider value={{
            state,
            dispatch
        }}>
            {children}
        </DataContext.Provider>
    )
}
