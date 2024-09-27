"use client";

import React, { useState } from 'react';
import ChatMessage from './ChatMessage'; // 先ほど作成した ChatMessage をインポート

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]); // メッセージのリストを保持

  const handleSendMessage = (message: string) => {
    setMessages([...messages, message]); // 新しいメッセージを追加
  };

  return (
    <div className='p-4'>
      {/* メッセージを表示 */}
      <div className='space-y-4'>
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </div>

      {/* メッセージ入力フィールド */}
      <div className='mt-4'>
        <input
          type="text"
          placeholder="メッセージを入力"
          className='border p-2 w-full'
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
              handleSendMessage(e.currentTarget.value);
              e.currentTarget.value = ''; // 入力フィールドをクリア
            }
          }}
        />
      </div>
    </div>
  );
};

export default Chat;
