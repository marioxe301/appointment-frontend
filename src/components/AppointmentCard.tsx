import { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { Card, Typography,Space, Button, Tooltip } from 'antd';
import { EditOutlined,DeleteOutlined} from '@ant-design/icons';
import { getDate,getTime} from '../services/DateParser';
import { deleteAppointment } from '../services/FunctionHandlers';
import { AppointmentEdit } from './AppointmentEdit';


export const AppointmentCard = () => {
    const {state,dispatch} = useContext(DataContext);
    const [visible,setVisible] = useState<boolean>(false);
    return(
        <div style={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexWrap: 'wrap'
        }}>
            {state.appointmentView.map((element,i)=>{
                return(
                    <div key={i}>
                        <Card bordered hoverable style={{
                            width: 300,
                            height: 'auto',
                            borderRadius: 20,
                            margin: 10,
                            borderColor: '#98938d'
                        }}>
                            <Space direction='vertical' size='small'>
                                <Typography.Title>
                                    {element.fields.title}
                                </Typography.Title>
                                <Typography.Text>
                                    Date: {getDate(element.fields.appointmentDateTime)}
                                </Typography.Text>
                                <Typography.Text>
                                    Time: {getTime(element.fields.appointmentDateTime)}
                                </Typography.Text>
                                <Typography.Paragraph>
                                    {element.fields.description}
                                </Typography.Paragraph>
                                <div>   
                                        <Tooltip title='edit' placement='bottom'>
                                            <Button shape='circle' type='link' style={{color: '#76b5c5'}} icon={<EditOutlined/>} onClick={()=>{dispatch({type:'setSelectedAppointment',payload: element}); setVisible(true);}}/>
                                        </Tooltip>
                                        <Tooltip title='delete' placement='bottom'>
                                            <Button shape='circle' type='link' style={{color:'red'}} icon={<DeleteOutlined/>} loading={state.loading} onClick={()=>deleteAppointment(element.docId,dispatch)}/>
                                        </Tooltip>
                                </div>
                            </Space>
                        </Card>
                    </div>
                )
            })}
            <AppointmentEdit isVisible={visible} setVisible={setVisible}/>
        </div>
    );
};

