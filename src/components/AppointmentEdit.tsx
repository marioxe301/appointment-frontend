import { Button, DatePicker, Form, Input, Modal, Space, Typography } from "antd";
import moment from "moment";
import { Dispatch, FC, SetStateAction, useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import { AppointmentFormFields } from "../models/appointment";
import { onFinishFailed, disableDays, disableHours, onFinishUpdateForm } from "../services/FunctionHandlers";

interface props {
    isVisible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>
}

export const AppointmentEdit: FC<props> = ({isVisible,setVisible}) =>{
    const [form] = Form.useForm();
    const {state,dispatch} = useContext(DataContext);

    useEffect(()=>{
        form.setFieldsValue({
            title: state.selectedAppointment.fields.title,
            description: state.selectedAppointment.fields.description,
            dateTime: moment(state.selectedAppointment.fields.appointmentDateTime)
        } as AppointmentFormFields);
    },[state.selectedAppointment]);


    return(
        <Modal
            visible={isVisible}
            onCancel={()=>setVisible(false)}
            title={
                <Typography.Title level={4} style={{color:'#2a2925'}}>
                    Edit Appointment
                </Typography.Title>
            }
            footer={<></>}
        >
            <Form
                    form={form}
                    name='Appointment Form'
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={(value: AppointmentFormFields)=>{onFinishUpdateForm(state.selectedAppointment.docId,value,form,dispatch,setVisible)}}
                    onFinishFailed={onFinishFailed}
                    autoComplete='off'
                >
                    <Form.Item
                        label='Title'
                        name='title'
                        rules={[{required:true,message:'Title for the appointment is required'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label='Date and Time'
                        name='dateTime'
                        rules={[{required:true,message:'Date for the appointment is required'}]}
                    >
                        <DatePicker
                            format='YYYY-MM-DD HH:mm'
                            showTime
                            disabledDate={disableDays}
                            disabledHours={disableHours}
                        />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{offset: 8, span: 16}}
                    > 
                        <Space size='small' direction='horizontal'>
                            <Button danger type='primary' shape='round' onClick={()=>{ setVisible(false); }}>Cancel</Button>
                            <Button type='primary' shape='round' htmlType='submit' loading={state.loading}>Update</Button>
                        </Space>
                    </Form.Item>
                </Form>
        </Modal>
    );
};