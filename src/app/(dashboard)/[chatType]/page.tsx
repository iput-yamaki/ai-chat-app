import ChatForm from '@/components/ChatForm';
import { notFound } from 'next/navigation';
import React from 'react'

const ChatTypePage = ({params}:{params:{chatType:string}}) => {
    const allowedChatType = ["conversation"];
    
    // 許可されていないチャットタイプの場合404を返す
    if (!allowedChatType.includes(params.chatType)) {
        return notFound();
    }

    return (
        <ChatForm />
    )
}

export default ChatTypePage;
