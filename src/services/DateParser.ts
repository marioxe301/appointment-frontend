import moment from "moment";


export const getDate = (isoDate: string): string =>{
    return moment(isoDate).format('YYYY-MM-DD')
};

export const getTime = (isoDate: string): string =>{
    return moment(isoDate).format('HH:mm');
};