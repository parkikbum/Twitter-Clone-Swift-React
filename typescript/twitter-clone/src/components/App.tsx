import React, { useState } from 'react';
import AppRouter from './Router';

function App() {
  const [isLoggedIn: boolean, setIsLoggedIn: boolean] = useState(true);
  return <AppRouter isLoggedIn={isLoggedIn}/>;
}

export default App;
