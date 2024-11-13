import Image from "./image"

export default function Header(){
    return (
        <header className="bg-dark-bckground sticky top-0 z-20 mx-auto flex w-full items-center justify-between border-b border-gray-500 p-8">
            <Image />
            <h1>ChatBot</h1>
        </header>
    )
}