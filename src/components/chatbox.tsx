'use client'
import { useState } from 'react';
import { TbMessageChatbot } from 'react-icons/tb';
import ChatMessage from './chatmessage';
import UserMessage from './usermessage';
import Input from './input';

const API_KEY = "9a6f014bc7284ef8a6d488996d861017";
const ENDPOINT = "https://genai-openai-genaiinsiders.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2024-02-15-preview";
const prompt = `You are an AI assistant tasked with helping users find the most suitable software from a provided list based on their needs. You will be given a list of software products and their capabilities, followed by a user query. Your job is to analyze the query, match it with the most appropriate software, or suggest alternatives if no suitable match is found. highlighting the fact no product was found but these are external alternatives.
 
 
Guidelines for interpreting user queries:
1. Users may describe their needs using non-technical language or vague terms.
2. Try to identify the core functionality or problem the user is trying to solve.
3. Consider both explicit and implicit requirements in the user's query.
 
Matching user needs with software capabilities:
1. Carefully review the capabilities of each software product in the list.
2. Look for keywords or concepts in the user's query that align with the software descriptions.
3. Consider multiple products if they partially meet the user's needs.
4. Prioritize software that meets the most critical requirements expressed by the user.
 
If no suitable software is found:
1. Explain why none of the listed products fully meet the user's needs.
2. Suggest the closest alternative from the list, if any, and explain its limitations.
3. Recommend that the user consider looking for alternative solutions outside the provided list.
 
Format your response as follows:
1. Begin with a brief restatement of the user's needs.
2. If a suitable product is found, provide its name and a brief explanation of why it's the best match.
3. If no suitable product is found, explain why and suggest alternatives as described above.
4. End with a question asking if the user needs any clarification or has additional requirements.
 
5. When a match is found provide options including:
Would you like to request deployment of the product
Would you like more information 
Would you like to know the product owner.
Place these specific options inside a JSON defined response.
 
6. When people request deployment. create an artificial URL that looks like https://MYIT/RequestPackage/<Packagename> 
Please analyze the query and provide your recommendation based on the software list and guidelines provided above.
7. If you did not find an example and details alternative market include a link to https://MYIT/Reqestanew product in the response
 
example 
Question:
i need a tool to create a pdf document
 
Answer:
You are looking for a tool to create and manage PDF documents.   Based on the Approved Product list, **Adobe Acrobat DC** would be the most suitable product for your needs. 
Adobe Acrobat DC is designed for PDF management and offers capabilities such as document management and e-signatures.   
 
Would you like more details about Adobe Acrobat DC or have any additional requirements?
Would you like to request Adobe Acrobat DC?
Find out the product owner of Adobe Acrobat DC?`

export default function Chatbox() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState(["", "", ""]);
  const [showPompt, setShowPompt] = useState(false);

  const handleNewMessage = async (message: string) => {
    setMessages([...messages, { role: 'user', content: message }]);
    setLoading(true);

    const payload = {
      messages: [
        {
          role: "system",
          content: [
            {
              type: "text",
              text: prompt
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
      let assistantMessage = data.choices[0].message.content;

      // Check if the response contains a JSON object at the end
      const jsonStartIndex = assistantMessage.lastIndexOf("json");
      if (jsonStartIndex !== -1) {
          const jsonEndIndex = assistantMessage.lastIndexOf("}");
          if (jsonEndIndex !== -1) {
              const jsonString = assistantMessage.substring(jsonStartIndex + 5, jsonEndIndex + 1).trim();
              console.log(jsonString);

              const jsonObject = JSON.parse(jsonString);
              console.log("Object:" + jsonObject);

              const [option1, option2, option3] = jsonObject.options;

              // Remove the JSON part from the assistant message
              assistantMessage = assistantMessage.substring(0, jsonStartIndex - 3).trim();

              // one = option1;
              // two = option2;
              // three = option3;

              setQuestions([option1, option2, option3]);
              // You can now use option1, option2, and option3 as needed
              //console.log(option1, option2, option3);
          }
      }

      setMessages([...messages, { role: 'user', content: message }, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error('Failed to make the request. Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='chatbox-wrapper'>
      <TbMessageChatbot size={38} className='right-24 bottom-[calc(1rem)] hover:cursor-pointer' onClick={() => setShowChat(!showChat)} />

      {showChat && (
        <div className='fixed right-12 bottom-[calc(4rem+1.5rem)] border rounded-md p-5 shadow-md h-[600px] w-[700px] bg-gray-700'>
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
              {loading && <div className="loading">Loading...</div>}
            </div>

            {/* Input */}
            <Input one={questions[0]} two={questions[1]} three={questions[2]} onSubmit={handleNewMessage} disabled={loading} />

          </div>
        </div>
      )}
    </div>
  );
}
