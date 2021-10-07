import moment from "moment";

export interface Appointment{
    title: string,
    description: string,
    appointmentDateTime: string
}

export interface AppointmentView{
    docId: string,
    fields: Appointment
}

export interface AppointmentState{
    appointmentView: AppointmentView[],
    loading: boolean,
    selectedAppointment: AppointmentView
}

export interface AppointmentFormFields{
    title: string,
    description: string,
    dateTime: moment.Moment
}