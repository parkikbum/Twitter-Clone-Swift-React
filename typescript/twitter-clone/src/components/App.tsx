import React, { useEffect, useState } from 'react';
import AppRouter from './Router';
import { authService } from '../fBase';
import { getAuth, onAuthStateChanged } from '@firebase/auth';


function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState<any>(null);
  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      console.log(user);
      if(user) {
        setIsLoggedIn(true);
        setUserObj(user);
        const uid = user.uid;
      } else{
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
    {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing...."}
    <footer>&copy; {new Date().getFullYear()} Twitter-Clone </footer>
    </>
    );
}

export default App;

