"use client";
import React, { useEffect } from 'react'
import BotAvatar from '@/components/BotAvatar'
import { Ellipsis, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { collection, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebaseClient';



const Sidebar = () => {

  const pathname = usePathname();
  //console.log(pathname);

  useEffect(( )=>{
    const q = query(collection(db,"chats"),where("state","==","CA") );

  },[]);

  const routes = [
    {
      label: "Conversation",
      href: "/conversation",
      color: "text-violet-500",
      Icon: MessageCircle
    }
  ];
  return (
    <div className='space-y-4 bg-gray-900 text-white p-3 h-full flex-col'>
      {/* タイトル＆ロゴエリア */}
      <Link href="/" className='flex items-center mb-6'>
        <div className='mr-3 pl-3'>
          <BotAvatar />
        </div>
        <h1 className='font-bold text-xl'>AI Chat App</h1>
      </Link>

      {/* チャットタイプエリア */}
      <div className='space-y-1'>
        {routes.map((route) => (
          <Link 
          href={route.href} key={route.href} className={cn('block p-3 text-sm font-medium text-zinc-400 text-white/10 hover:text-white hover:bg-white/10 transition rounded-lg',
            pathname.startsWith(route.href)  && "bg-white/10"
          )}>
            <div className='flex items-center '>
              <route.Icon className={cn(`h-5 w-5 mr-3`, route.color)} />
              <p>{route.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* チャットルームエリア */}
      <div className='flex flex-1 flex-col overflow-hidden space-y-1'>
        <h2 className='text-xs font-medium px-2 py-4'>ChatRoom</h2>
        <div className='overflow-auto'>
        <Link 
          href={"#"} 
          //key={route.href} 
          className={cn('block p-3 text-sm font-medium text-zinc-400 text-white/10 hover:text-white hover:bg-white/10 transition rounded-lg',
            //pathname.startsWith(route.href)  && "bg-white/10"
          )}>
            <div className='flex items-center justify-between'>
              <p className='font-medium truncate'>message</p>
              
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Ellipsis size={16}/>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>削除</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
        </Link>

        </div>
      </div>
    </div>
  )
}

export default Sidebar;
