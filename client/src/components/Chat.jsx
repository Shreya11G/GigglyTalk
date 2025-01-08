import React from 'react'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import ChatContainer from './ChatContainer'
import ScrollableFeed from 'react-scrollable-feed';

const Chat = ({user ,message, messages, setMessage ,sendMessage}) => {
  
  return (
        <ChatContainer>
          <ChatHeader user={user}/>
          <div className="position-relative overflow-auto chat-height">
            <ScrollableFeed className='styles_scrollable-div_prSCv'>
            <div className="p-4 d-flex flex-column">
              {messages.map((message,index)=>{
                return message.type==="userStatus"? (
                <div key={index} className='text-center'>
                  <span className="badge user-joined">
                    {message.userId === user.userId ? "You have Joined!" : `${message.username} has Join!`}
                  </span>
                </div>
                ): (
                  <div key={index} className ={message.userId === user.userId 
                    ? "chat-message-right pb-4" 
                    : "chat-message-left pb-4"}>
                      <div>
                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" 
                            className='rounded-circle mr-1 border-avatar' 
                            alt={message.username}
                            title={message.user} 
                            width="40"
                            height="40"
                            />
                            <div className=" small text-nowrap mt-2 time-white">
                              {message.time}
                            </div>
                      </div>
                      <div className="flex-shrink-1  py-2 px-3 ml-3 chat-user-message-background">
                        <div className="font-weight-bold mr-1 chat-user-name">
                          {message.userId === user.userId ? "You" : message.username}
                        </div>
                        {message.message}
                      </div>
                    </div>
                );
              })}
            </div>
            </ScrollableFeed>
          </div>
         <ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage}/>
        </ChatContainer>
    )
  }


export default Chat
