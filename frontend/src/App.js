import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const fetch_test_data = async () => {
  const response = await window.fetch(`${process.env.REACT_APP_API_URL}/dishes`)
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message) 
  }

  return body;
}

const App = () => {
  console.log('render sdf')
  // useEffect(() => {
  //   fetch_test_data()
  //     .then(console.log)
  //     .catch(console.error);
  // }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Femboy Party</h1>

        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
