'use client'
import { useState } from 'react';
import { TbMessageChatbot } from 'react-icons/tb';
import ChatMessage from './chatmessage';
import UserMessage from './usermessage';
import Input from './input';

const API_KEY = "9a6f014bc7284ef8a6d488996d861017";
const ENDPOINT = "https://genai-openai-genaiinsiders.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2024-02-15-preview";

export default function Chatbot() {
  const [showChat, setShowChat] = useState(true);
  const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);

  const handleNewMessage = async (message: string) => {
    setMessages([...messages, { role: 'user', content: message }]);

    const payload = {
      messages: [
        {
          role: "system",
          content: [
            {
              type: "text",
              text: "You are an AI assistant that helps people find information."
            }
          ]
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: message
            }
          ]
        }
      ],
      temperature: 0.7,
      top_p: 0.95,
      max_tokens: 800
    };

    const headers = {
      "Content-Type": "application/json",
      "api-key": API_KEY,
    };

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = data.choices[0].message.content;
      setMessages([...messages, { role: 'user', content: message }, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error('Failed to make the request. Error:', error);
    }
  };

  return (
    <>
      <TbMessageChatbot size={48} className='fixed right-24 bottom-[calc(1rem)] hover:cursor-pointer' onClick={() => setShowChat(!showChat)} />

      {showChat && (
        <div className='fixed right-12 bottom-[calc(4rem+1.5rem)] border hover:cursor-pointer p-5 shadow-md shadow-white h-[600px] w-[700px]'>
          <div className='flex flex-col h-full'>

            {/* Header */}
            <div>
              <h2 className='font-semibold text-lg tracking-tight'>BABS Chatbot</h2>
              <p>GenAI Hackathon</p>
            </div>

            {/* Chatbox */}
            <div className='flex flex-col flex-1 items-center p-2 mt-5 overflow-y-auto'>
                <ChatMessage message="Hi I'm Babs"/>
              {messages.map((message, index) => (
                message.role === 'user' ? (
                  <UserMessage key={index} message={message.content} />
                ) : (
                  <ChatMessage key={index} message={message.content} />
                )
              ))}
            </div>

            {/* Input */}
            <Input onSubmit={handleNewMessage} disabled={false} />

          </div>
        </div>
      )}
    </>
  );
}
