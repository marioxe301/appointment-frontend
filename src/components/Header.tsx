import { Layout } from 'antd';

export const Header = () =>{
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
