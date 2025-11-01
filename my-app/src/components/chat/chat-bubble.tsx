"use client";

import { useState, useEffect } from 'react';
import type { Message } from "./chat-view";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from 'date-fns';
import { PlaceHolderImages } from "@/lib/placeholder-images.json";
import Image from "next/image";

type ChatBubbleProps = {
  message: Message;
};

const botAvatar = PlaceHolderImages.find(p => p.id === 'bot-avatar');

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.sender === "user";
  const [formattedTimestamp, setFormattedTimestamp] = useState('');

  useEffect(() => {
    setFormattedTimestamp(format(new Date(message.timestamp), 'p'));
  }, [message.timestamp]);

  return (
    <div className={cn("flex items-end gap-2 font-primary", isUser ? "justify-end" : "justify-start")}>
      {!isUser && botAvatar && (
        <Avatar className="w-8 h-8">
           <Image src={botAvatar.imageUrl} alt={botAvatar.description} data-ai-hint={botAvatar.imageHint} width={32} height={32} className="rounded-full" />
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
      )}
      <div className={cn("max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 shadow-md wrap-break-word",
          isUser
            ? "bg-secondary text-secondary-foreground rounded-br-none"
            : "bg-primary text-primary-foreground rounded-bl-none"
        )}
        >

        <p className="text-sm">{message.text}</p>

        {formattedTimestamp && (
          <p className="mt-1 text-xs text-right opacity-70">
            {formattedTimestamp}
          </p>
        )}

      </div>
    </div>
  );
}
