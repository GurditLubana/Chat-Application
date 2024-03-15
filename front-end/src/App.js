import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import SendMsg from './components/SendMsg';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api');
        setMessage(response.data.message);
      } catch (error) {
        console.error('There was an error!', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {/* <header className="App-header">
        <p>Message from backend: {message}.</p>
        <p>Hello world {message}.</p>
      </header> */}

      <SendMsg />
    </div>
  );
}

export default App;
