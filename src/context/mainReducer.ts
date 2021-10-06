import { Appointment, AppointmentState, AppointmentView } from "../models/appointment"

export const INITIAL_STATE: AppointmentState = {
    appointmentView: [],
    loading: false,
    selectedAppointment: {
        docId:'',
        fields:{
            title:'',
            description:'',
            appointmentDateTime:''
        }
    }
}

export type AppointmentAction =
    | { type: 'addAppointment', payload: AppointmentView }
    | { type: 'getAppointments', payload: Array<AppointmentView> }
    | { type: 'deleteAppointment' ,payload: { id: string }}
    | { type: 'updateAppointment' ,payload: { id: string, data: Appointment}}
    | { type: 'apiCallInit'}
    | { type: 'apiCallFinished'}
    | { type: 'setSelectedAppointment' , payload: AppointmentView }


export const mainReducer = (state: AppointmentState, action: AppointmentAction): AppointmentState =>{
    switch (action.type) {
        case 'addAppointment':
            return {
                ...state,
                appointmentView: [...state.appointmentView ,action.payload]
            };
        case 'getAppointments':
            return{
                ...state,
                appointmentView: action.payload
            };
        case 'deleteAppointment':
            return{
                ...state,
                appointmentView: state.appointmentView.filter(element => element.docId !== action.payload.id)
            }
        case 'updateAppointment':
            const index: number = state.appointmentView.findIndex(element => element.docId === action.payload.id);
            state.appointmentView[index].fields = action.payload.data;
            return state;
        case 'apiCallInit':
            return{
                ...state,
                loading: true
            }
        case 'apiCallFinished':
            return{
                ...state,
                loading: false
            }
        case 'setSelectedAppointment':
            return{
                ...state,
                selectedAppointment: action.payload
            }
        default:
            return state;
    }
}