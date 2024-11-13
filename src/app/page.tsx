import Chatbot from "@/components/chatbot"

export default function Page(){
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>PLC Chatbot with GenAI</h1>

      <Chatbot />
    </main>
  )
}