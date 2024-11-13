
'use client'
import { useState } from 'react'
import { TbMessageChatbot } from 'react-icons/tb'
import ChatMessage from './chatmessage'
import UserMessage from './usermessage'
import Input from './input'
export default function Chatbot(){
    const [showChat, setShowChat] = useState(true)
    return (
        <>
            <TbMessageChatbot size={48} className='fixed right-24 bottom-[calc(1rem)] hover:cursor-pointer' onClick={() => setShowChat(!showChat)}/>
            {showChat && (
            <div className='fixed right-12 bottom-[calc(4rem+1.5rem)] border*: hover:cursor-pointer p-5 shadow-md shadow-white h-[474px] w-[500px]'>
                <div className='flex flex-col h-full'>

                    {/* Header */}
                    <div>
                        <h2 className='font-semibold text-lg tracking-tight'>BABS Chatbot</h2>
                        <p>GenAI Hackathon</p>
                    </div>
                    {/* Chatbox */}
                    <div className='flex flex-col flex-1 items-center p-2 mt-5 overflow-y-auto'>
                        <ChatMessage />
                        <UserMessage />
                    </div>
                    {/* Messages */}
                    <Input />
                </div>
            </div>
        )}
        </>
        
    )
}
