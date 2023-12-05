import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

import './App.css';
import logo from './logo.svg';

const queryClient = new QueryClient()

const Test = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['dishes'],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_API_URL}/dishes`).then(
        (res) => res.json(),
      ),
  });

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  console.log(data);

  return (
    <>
      <header className="App-header">
        <h1>Femboy Party</h1>
      </header>

      <main>
        <img src={logo} className="App-logo" alt="logo" />
      </main>
    </>

  )
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Test/>
      </div>
    </QueryClientProvider>
  );
}

export default App;
