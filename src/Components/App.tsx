import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../firebaseConfig";
import Loading from "./Loading";
import { updateProfile } from "@firebase/auth";

interface IUser {
  displayName: string | null;
  uid: string;
  profilePhotoURL: string | null;
  updataProfile: (args: any) => Promise<void>;
}
function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState<IUser | undefined>();

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          profilePhotoURL: user.photoURL,
          updataProfile: (args) =>
            updateProfile(user, {
              displayName: user.displayName,
              photoURL: user.photoURL,
            }),
        });
      } else {
        setUserObj(undefined);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    if (user) {
      if (user.displayName === null) {
        user.updateProfile({
          displayName: "Guest",
        });
      }
      setUserObj({
        displayName: user.displayName,
        uid: user.uid,
        profilePhotoURL: user.photoURL,
        updataProfile: (args) =>
          updateProfile(user, {
            displayName: user.displayName,
            photoURL: user.photoURL,
          }),
      });
    }
  };
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        <Loading page={"login"} />
      )}
    </>
  );
}

export default App;
