'use client'
import { useState } from 'react'
import { TbMessageChatbot } from 'react-icons/tb'

export default function Chatbot(){

    const [showChat, setShowChat] = useState(true)

    return (
        <>
            <TbMessageChatbot size={48} className='fixed right-24 bottom-[calc(1rem)] hover:cursor-pointer'/>

            {showChat && (
            <div className='fixed right-12 bottom-[calc(4rem+1.5rem)] hover:cursor-pointer p-5 shadow-md shadow-white h-[474px] w-[500px]'>
                {/* Header */}
                <div>
                    <h2 className='font-semibold text-lg tracking-tight'>PLC Chatbot</h2>
                    <p>GenAI Hackathon</p>
                </div>

                <div className='flex flex-col flex-1 items-center p-2 mt-5 overflow-y-auto'>
                    <div>Messages...</div>

                </div>
            </div>
        )}
        </>

        
    )
}