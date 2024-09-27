import Chat from '@/components/Chat';
import { notFound } from 'next/navigation';
import React from 'react'

const ChatRoomPage = ({params}:{params:{chatType:string}}) => {

    const allowdChatType =["conversation" ];
    if(!allowdChatType.includes(params.chatType)){
        return notFound()
    }
  return (
    
    <Chat/>
  )
}

export default ChatRoomPage