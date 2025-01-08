import React from 'react'

const ChatHeader = ({user}) => {
  return (
    <div className=" align-item-start py-2 px-4 w-100 border-dark border-bottom d-lg-block sticky-top bg-dark rounded">
    <div className="d-flex align-item-center py-1">
      <div className="position-relative ">
        <img src="https://bootdey.com/img/Content/avatar/avatar3.png"  className="rounded-circle mx-2 border-avatar" alt={user.username} width="40" height="40"/>
      </div>
      <div className="flex-glow-1">
        <strong className= "loggedin">Logged in as {user.username}</strong>
      </div>
    </div>
  </div>
  )
}

export default ChatHeader
