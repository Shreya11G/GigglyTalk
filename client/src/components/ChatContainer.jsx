import React from 'react'

const ChatContainer = (props) => {
  return (
    <div>
       <div className="card w-100 border-dark border-5 ">
    <div className="row vh-95">
      <div className=" d-flex flex-column col-12 col-lg-12 col-xl-12 chat-window chat-background rounded ">
        {props.children}
      </div>
    </div>
  </div>
    </div>
  )
}

export default ChatContainer
