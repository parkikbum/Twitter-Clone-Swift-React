import React, { useState } from 'react';
import { boolean } from 'yargs';
import AppRouter from './Router';
import { authService } from '../fBase';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
    <AppRouter isLoggedIn = {isLoggedIn}/>
    <footer>&copy; {new Date().getFullYear()} Twitter-Clone {authService.currentUser}</footer>
    </>
    );
}

export default App;

