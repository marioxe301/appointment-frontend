import { message, FormInstance } from "antd";
import axios from "axios";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { Dispatch, SetStateAction } from "react";
import { AppointmentAction } from "../context/mainReducer";
import { Appointment, AppointmentFormFields, AppointmentView } from "../models/appointment";
import { range } from "./ArrayUtils";

export const ApiUrl= "https://appointment-api-m.herokuapp.com/appointment";

export const disableDays = (current: moment.Moment): boolean =>{
    return current.day() === 6 || current.day() === 0;
};


export const disableHours = (): Array<number> =>{
    return range(0,8).concat(range(18,24));
};


export const onFinishAddForm = async (formFields: AppointmentFormFields, form: FormInstance<any>, dispatch: Dispatch<AppointmentAction>, setVisible: Dispatch<SetStateAction<boolean>> ): Promise<void> =>{
    dispatch({type:'apiCallInit'});
    const body: Appointment ={
        title: formFields.title,
        description: formFields.description,
        appointmentDateTime: formFields.dateTime.toISOString()
    }

    try{
        const response = await axios.post<any>(ApiUrl,body);
        const newAppointmentElement = response.data as AppointmentView;
        dispatch({type:'addAppointment',payload: newAppointmentElement});
        message.success('Appointment Added');
    }catch(error){
        console.log(error);
        message.error('Unexpected Error when Adding');
    }

    dispatch({type:'apiCallFinished'});
    form.resetFields();
    setVisible(false);
};


export const onFinishUpdateForm = async (docId: string,formFields: AppointmentFormFields,form: FormInstance<any>,dispatch: Dispatch<AppointmentAction>, setVisible: Dispatch<SetStateAction<boolean>>): Promise<void> =>{
    dispatch({type:'apiCallInit'});
    const body: Appointment ={
        title: formFields.title,
        description: formFields.description,
        appointmentDateTime: formFields.dateTime.toISOString()
    }

    try {
        await axios.put(ApiUrl+`/${docId}`,body);
        dispatch({type:'updateAppointment',payload: {id:docId,data:body}});
        message.success('Appointment Updated');
    } catch (error) {
        console.log(error);
        message.error('Unexpected Error when Updating');
    }
    dispatch({type:'apiCallFinished'});
    form.resetFields();
    setVisible(false);
};


export const onFinishFailed  = (error: ValidateErrorEntity<any>): void =>{ 
    console.log(error);
    message.error('Check Required Fields');
};


export const deleteAppointment = async (docId: string,dispatch: Dispatch<AppointmentAction>): Promise<void> =>{
    dispatch({type:'apiCallInit'});
    try{
        await axios.delete(ApiUrl+`/${docId}`);
        dispatch({type:'deleteAppointment', payload: {id:docId}});
        message.success('Appointment Deleted');
    }catch(error){
        console.log(error);
        message.error('Unexpected Error when Deleting');
    }
    dispatch({type:'apiCallFinished'});
};


export const modifyAppointment = async (docId: string , appointment: Appointment, dispatch: Dispatch<AppointmentAction>):Promise<void> =>{
    dispatch({type:'apiCallInit'});
    try{
        await axios.put(ApiUrl+`/${docId}`,appointment);
        dispatch({type:'updateAppointment',payload: {id: docId,data:appointment}});
        message.success('Appointment Updated');
    }catch(error){
        console.log(error);
        message.error('Unexpected Error when Updating');
    }
    dispatch({type:'apiCallFinished'});
};