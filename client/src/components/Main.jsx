import React from 'react'
import Login from "./Login";
import Chat from "./Chat";
import { useState, useEffect } from 'react';
const Main = ({socket}) => {
    // username 
  const [newUser,setNewUser]= useState("");
  const [user,setUser] =useState({});
  const [users,setUsers] =useState([]);
  const [message,setMessage]=useState("");
  const [messages,setMessages]=useState([]);
 
    useEffect(()=>{
        socket.on("users", (users)=>{
            console.log(users);
            const messagesArr=[];
            for (const {userId,username} of users) {
                
                const newMessage = {type: "userStatus",userId, username};
                messagesArr.push(newMessage);
            }
            setMessages([...messages ,  ...messagesArr]);
            setUsers(users);
        });
        socket.on("session",({userId,username})=>{
            setUser({userId,username});
        });
        socket.on("user connected",({userId,username})=>{
            const newMessage = {type: "userStatus",userId, username};
            setMessages([...messages ,newMessage]);
        });
        socket.on("new message",({ userId, username, message,time })=>{
          const newMessage={
            type: "message" , 
            userId: userId , 
            username: username ,
            message,
            time
          };
          setMessages([...messages, newMessage]);
        });
    },[socket , messages]);

  function logNewUser(){
    setUser(newUser);
    //it will send user name to socket server 
    socket.auth={username: newUser};
    socket.connect();
  }
 

  function sendMessage(){
    
    const newMessage={ 
      type: "message" , 
      userId: user.userId , 
      username: user.username ,
      message,
      time:new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})
      
    };
    socket.emit("new message",message);
    setMessages([...messages, newMessage]);
    setMessage("");
  }
  return (
    <main className="content">
      <div className="container mt-3">
        {user.userId && (
          <Chat 
          user={user} 
          message={message} 
          messages={messages} 
          setMessage={setMessage}
          sendMessage={sendMessage}
          />
        ) }
        {!user.userId &&(
          <Login 
          newUser={newUser } 
          setNewUser={setNewUser} 
          logNewUser={logNewUser}/>
        )
        }
      </div>
    </main>
  )
}

export default Main
