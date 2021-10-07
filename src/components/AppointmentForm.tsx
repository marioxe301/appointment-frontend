import { FC, useContext, useState } from 'react';
import {Button, Modal, Typography,Input, Form, DatePicker, Space} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import { disableDays, disableHours, onFinishAddForm, onFinishFailed } from '../services/FunctionHandlers';
import { DataContext } from '../context/DataContext';


export const AppointmentForm: FC = () => {
    const [visible,setVisible] = useState<boolean>(false);
    const {state, dispatch}= useContext(DataContext);
    const [form] = Form.useForm();

    return (
        <div style={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            margin: 10
        }}
        >
            <Button 
                onClick={()=> setVisible(true)}
                size='large' 
                type='primary' 
                shape='round' 
                icon={<PlusOutlined/>}
            >
                Add Appointment
            </Button>
            <Modal
                visible={visible}
                onCancel={()=>setVisible(false)}
                title={
                    <Typography.Title level={4} style={{color:'#2a2925'}}>
                        Add New Appointment
                    </Typography.Title>
                }
                footer={<></>}
            >
                <Form
                    form={form}
                    name='Appointment Form'
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={(value)=> {onFinishAddForm(value,form,dispatch,setVisible)}}
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
                            <Button danger type='primary' shape='round'>Cancel</Button>
                            <Button type='primary' shape='round' htmlType='submit' loading={state.loading}>Add</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
