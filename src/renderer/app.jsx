import React from "react";
import { render } from "react-dom";
import { Router, Route, hashHistory } from "react-router";
import Login from "./Login";
import Signup from "./Signup";
import Rooms from "./Rooms";
import Room from "./Room";

import firebase from "firebase/firebase-browser";

const appRouting = (
    <Router history={hashHistory}>
        <Route path="/">
        <Route path="login" component={Login} />
        <Route path="signup" component={Signup} />
        <Route path="rooms" component={Rooms}>
            <Route path=":roomId" component={Room} />
        </Route>
        </Route>
    </Router>
);

if (!location.hash.length) {
    location.hash = "#/login";
}
  var config = {
    apiKey: "AIzaSyB1F_7bS6XOi_CgmFDhe9UlcQgdT_lF-8Q",
    authDomain: "electron-chat-0127.firebaseapp.com",
    databaseURL: "https://electron-chat-0127.firebaseio.com",
    projectId: "electron-chat-0127",
    storageBucket: "electron-chat-0127.appspot.com",
    messagingSenderId: "646132157959"
  };
  firebase.initializeApp(config);

render(appRouting, document.getElementById("app"));