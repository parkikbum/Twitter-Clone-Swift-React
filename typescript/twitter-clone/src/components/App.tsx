import React, { useEffect, useState } from 'react';
import AppRouter from './Router';
import { authService } from '../fBase';
import { getAuth, onAuthStateChanged, updateProfile } from '@firebase/auth';


function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState<any>(null);
  const [newName, setNewName] = useState("")

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
  const refreshUser: any = () => {
    const user: any = authService.currentUser;
    setNewName(user?.displayName);
    setUserObj(authService.currentUser);
  };
  return (
    <>
    {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing...."}
    {console.log(userObj)}
    <footer>&copy; {new Date().getFullYear()} Twitter-Clone </footer>
    </>
    );
}

export default App;

