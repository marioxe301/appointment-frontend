import { Layout } from 'antd';
import { AppointmentCard } from './components/AppointmentCard';
import { AppointmentForm } from './components/AppointmentForm';
import { Header } from './components/Header';
import { DataProvider } from './context/DataProvider';

const App = () => {
  return (
    <DataProvider>
      <Layout>
        <Header/>
        <Layout.Content style={{backgroundColor: '#ffffff'}}>
          <AppointmentForm/>
          <AppointmentCard/>
        </Layout.Content>
      </Layout>
    </DataProvider>
  );
}

export default App;
