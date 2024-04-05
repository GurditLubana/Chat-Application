import React, { useState } from 'react'
import ConnectedUsers from './ConnectedUsers'
import MessageBody from './MessageBody'
import Sendmsg from './SendMsg'

export default function ChatApp() {
    const[messageList, setMsgList] = useState([])
   
  return (
    <div>
      <ConnectedUsers />
            <MessageBody messageList={messageList}/>
            <Sendmsg setMsgList={setMsgList}/>
    </div>
  )
}
