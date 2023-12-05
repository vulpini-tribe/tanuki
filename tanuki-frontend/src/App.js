import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

import logo from './logo.svg';
import './App.css';

const queryClient = new QueryClient()

const Test = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['/api/dishes'],
    queryFn: () =>
      fetch(`/api/dishes`).then(
        (res) => res.json(),
      ),
  });

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  console.log(data);

  return (
    <header className="App-header">
      <h1>Femboy Party</h1>
      <img src={logo} className="App-logo" alt="logo" />
    </header>
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
