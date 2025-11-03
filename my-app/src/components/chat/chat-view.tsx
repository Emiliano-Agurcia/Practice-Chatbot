"use client";

import { useState } from "react";
import { Circle } from "lucide-react";
import ChatMessages from "./chat-messages";
import MessageInput from "./message-input";

export type Message = {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
};

type ChatViewProps = {
  initialMessages: Message[];
};

export default function ChatView({ initialMessages }: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const handleSend = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Respuesta del bot
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: `You said: "${text}". I am a simple bot and can only echo your messages.`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
  <div className="flex flex-col w-full h-screen max-w-6xl mx-auto bg-cover shadow-2xl bg-chat-bg">
       <header className="p-4 border-b shadow-sm border-border bg-terciary">
        <h1 className="text-2xl text-terciary-foreground font-secondary">ChatBot</h1>
        
        <p className="flex flex-row gap-1 w-max text-md text-primary"><Circle className="self-center w-2 h-2 text-test1 fill-test sm:fill-test2 lg:fill-test1" />Online</p>
       </header>
       <div className="flex flex-col flex-1 overflow-hidden">
        <ChatMessages messages={messages} />
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}
