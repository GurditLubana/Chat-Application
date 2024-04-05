import React, { useState } from 'react'
import ConnectedUsers from './ConnectedUsers'
import MessageBody from './MessageBody'
import Sendmsg from './SendMsg'

export default function ChatApp() {
    const[newMessage, setNewMessage] = useState(null)
    const[messageList, setMsgList] = useState([])
    const updateMsg = (newMessage)=>{

        setNewMessage(newMessage);
        setMsgList(list => [...list, newMessage]);
    
      }
    
  return (
    <div>
      <ConnectedUsers />
            <MessageBody messageList={messageList}/>
            <Sendmsg setNewMessage={updateMsg}/>
    </div>
  )
}
