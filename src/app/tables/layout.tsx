import Chatbox from "@/components/chatbox";

export default function TableLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
            <Chatbox />
            {children}
        </>
            

    );
  }
  