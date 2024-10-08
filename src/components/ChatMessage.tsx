import React from 'react'
import BotAvatar from './BotAvatar'

interface ChatMessageProps {
  message: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className='flex-1 p-4 space-y-4 overflow-auto'>
      <div className='flex space-x-4'>
        <BotAvatar />
        <div>
          <div className='bg-white p-4 rounded-lg shadow break-all whitespace-pre-wrap'>
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatMessage;
