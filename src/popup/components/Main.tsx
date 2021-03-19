import * as React from "react";
import { useState, useEffect } from "react";
import "firebase/auth";
import { auth, provider} from "../../background_script/firebase";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import WelcomeScreen from "../pages/WelcomeScreen";
import AddNote from "./AddNote";
// import { CredRef } from "../../background_script/firebase";
import { AppCredentials, useCred } from "../utils/useToken";
import firebase = require("firebase");


const Main = () => {
  const [currentUser, setcurrentUser] = React.useState<any>(null);
  const [loadComplete, setLoadComplete] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any>();
  const [userId, setUserId] = React.useState<any>();
  
  const {
    handleChange: updateCreds,
    handleRemove: updateDocs,
    checkStorage
    cred,
  } = useCred();


  const handleUserID = () => {
    console.log("handleUsrId" , auth.currentUser?.uid);
    updateCreds?.({ ...(cred || {}), ["UserId"]: String(auth.currentUser?.uid) })
  }

  
  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      // console.log(user?.uid);
      if (!loadComplete) {
        setTimeout(() => {
          setLoadComplete(true);
        }, 50);
      }
      setcurrentUser(user);
    });
  }, []);

  if (!loadComplete) {
    return <WelcomeScreen />;
  }


  // console.log("firebaseData" , data.UserId);
  // console.log("firebaseData" , data.token);
  // console.log("firebaseData" , data.repoName);
  // console.log("firebaseData" , data.branch);
  // console.log("firebaseData" , data.workflowId);
  
  const local =
    cred?.workflowId?.length && cred?.repoName?.length && cred.branch?.length;
  
  return (
    <div>
      {currentUser && cred?.token?.length ? (
        local ? (
          <AddNote />
        ) : (
          <MainPage />
        )
      ) : (
        <LoginPage />
      )}
    </div>
  );
};

export default Main;
