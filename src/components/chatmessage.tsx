import { RiRobot3Line } from "react-icons/ri";

interface ChatMessageProps {
    message: string;
}

export default function ChatMessage({ message }: ChatMessageProps) {
    return (
        <div className="flex w-full my-2">
            <div className="flex justify-center p-1 w-8 h-8 border bg-slate-800 rounded-full mr-2">
                <RiRobot3Line size={28}/>
            </div>
            
            <div>
                <div>Babs</div>
                <p className="text-base">{message}</p>
            </div>
            
        </div>
    )
}