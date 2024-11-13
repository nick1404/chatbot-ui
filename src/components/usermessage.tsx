import { CiUser } from "react-icons/ci";

interface UserMessageProps {
    message: string;
}

export default function UserMessage({message}: UserMessageProps) {
    return (
        <div className="flex w-full my-2">
            <div className="flex justify-center p-1 w-8 h-8 border bg-slate-800 rounded-full mr-2">
                <CiUser size={28}/>
            </div>
            
            <div>
                <div>User</div>
                <p className="text-sm">{message}</p>
            </div>
        </div>
    );
}

