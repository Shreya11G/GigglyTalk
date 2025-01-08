import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css"
import {io} from "socket.io-client";
import React from 'react';
import Main from "./components/Main";


const socket= io("http://localhost:4000",{
  transports: ["websocket"],
  debug: true
});

function App() {
  

  return (
    <Main socket={socket}/>
  );
}

export default App
