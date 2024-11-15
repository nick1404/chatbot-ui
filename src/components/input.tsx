import { useState } from 'react';

interface InputProps {
  onSubmit: (message: string) => void;
  disabled: boolean;
  one: string;
  two: string;
  three: string;
}

export default function Input({ onSubmit, disabled, one, two, three }: InputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleBubbleClick = (question: string) => {
    setInputValue(question);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSubmit(inputValue);
      setInputValue('');
    }
  };

  return (
    <>
    <div className='flex flex-row space-x-2 h-8 mb-1'>
      <div onClick={() => handleBubbleClick(one)} className="basis-1/3 border rounded-md text-xs">{one}</div>
      <div onClick={() => handleBubbleClick(two)} className="basis-1/3 border rounded-md text-xs">{two}</div>
      <div onClick={() => handleBubbleClick(three)} className="basis-1/3 border rounded-md text-xs">{three}</div>
    </div>
    <div className="flex space-x-2 items-center mt-auto">
      <form className="flex items-center justify-center w-full space-x-2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ask your question here"
          className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 text-sm text-black"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={disabled}
        />
        <button className="p-2 bg-white text-black inline-flex items-center justify-center rounded-md text-sm font-medium px-4 py-2" disabled={disabled}>
          Send
        </button>
      </form>
    </div>
    </>
  );
}