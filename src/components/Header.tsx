import { Layout } from 'antd';
import { FC } from 'react';

export const Header:FC = () =>{
    return(
        <Layout.Header style={{
          color: 'white',
          fontWeight: 'bolder',
          textAlign: 'center',
          backgroundColor: '#154c79',
          fontSize: 30,     
        }}>
          Appointments App
        </Layout.Header>
    );
};
