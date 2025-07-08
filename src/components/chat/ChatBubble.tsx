
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ChatBubbleProps {
  message: string;
  timestamp: string;
  isUser?: boolean;
  avatar?: string;
  username?: string;
  isTyping?: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  timestamp,
  isUser = false,
  avatar,
  username,
  isTyping = false
}) => {
  return (
    <div className={cn(
      "flex gap-3 mb-4 animate-fade-in",
      isUser ? "flex-row-reverse" : "flex-row"
    )}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        <Avatar className="w-8 h-8">
          <AvatarImage src={avatar} />
          <AvatarFallback className={cn(
            "text-xs font-semibold",
            isUser ? "bg-blue-500 text-white" : "bg-purple-500 text-white"
          )}>
            {username ? username.charAt(0).toUpperCase() : (isUser ? 'S' : 'B')}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Message Container */}
      <div className={cn(
        "flex flex-col gap-1 max-w-[80%] sm:max-w-[70%]",
        isUser ? "items-end" : "items-start"
      )}>
        {/* Username */}
        {username && !isUser && (
          <span className="text-xs text-muted-foreground px-2">
            {username}
          </span>
        )}

        {/* Message Bubble */}
        <div className={cn(
          "relative px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md",
          isUser 
            ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-md" 
            : "bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-bl-md",
          "backdrop-blur-sm"
        )}>
          {isTyping ? (
            <div className="flex gap-1 items-center py-1">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce"></div>
              </div>
              <span className="text-sm ml-2 text-white/80">yazıyor...</span>
            </div>
          ) : (
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
              {message}
            </p>
          )}

          {/* Message Tail */}
          <div className={cn(
            "absolute top-4 w-3 h-3 transform rotate-45",
            isUser 
              ? "-right-1 bg-gradient-to-br from-blue-500 to-blue-600" 
              : "-left-1 bg-gradient-to-br from-purple-500 to-purple-600"
          )} />
        </div>

        {/* Timestamp */}
        <span className={cn(
          "text-xs text-muted-foreground px-2",
          isUser ? "text-right" : "text-left"
        )}>
          {timestamp}
        </span>
      </div>
    </div>
  );
};
