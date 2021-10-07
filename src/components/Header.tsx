import { Image,Avatar, Layout } from 'antd';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { ImageApiUrl, ClientId } from '../services/FunctionHandlers';

export const Header:FC = () =>{
    const [image, setImage] = useState<string>('');
    useEffect(()=>{
      const getRandomImage = async (): Promise<string> =>{
        const response = await axios.get<any>(ImageApiUrl+`?client_id=${ClientId}`);
        const image = response.data.user.profile_image.medium as string;
        setImage(image);
        return image;
      };
      getRandomImage();
    },[]);

    return(
        <Layout.Header style={{
          color: 'white',
          fontWeight: 'bolder',
          textAlign: 'center',
          backgroundColor: '#154c79',
          fontSize: 30,     
        }}>
          Appointments App
            <Avatar
            style={{
              marginLeft: 30,
              marginTop: -10
            }}
            icon={
              <Image
                src={image}
                preview={false}
                />
            }
            size={45}
            />
        </Layout.Header>
    );
};
