import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../firebaseConfig";

function App() {
  const [isLoggendIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return <>{init ? <AppRouter isLoggedIn={isLoggendIn} /> : "로그인중..."}</>;
}

export default App;
