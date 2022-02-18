import React, { useState } from 'react';
import { boolean } from 'yargs';
import AppRouter from './Router';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return <AppRouter isLoggedIn = {isLoggedIn}/>;
}

export default App;

