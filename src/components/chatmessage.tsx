import { RiRobot3Line } from "react-icons/ri";
export default function ChatMessage(){
    return (
        <div className="flex w-full my-2">
            <div className="flex justify-center p-1 w-8 h-8 border bg-slate-800 rounded-full mr-2">
                <RiRobot3Line size={28}/>
            </div>
            
            <div>
                <div>Babs</div>
                <p className="text-sm">Hello, how can I help you today?</p>
            </div>
            
        </div>
    )
}