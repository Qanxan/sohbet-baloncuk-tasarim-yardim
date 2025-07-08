
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
      "flex gap-3 mb-6 animate-fade-in",
      isUser ? "flex-row-reverse" : "flex-row"
    )}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        <Avatar className="w-9 h-9 border-2 border-white shadow-sm">
          <AvatarImage src={avatar} />
          <AvatarFallback className={cn(
            "text-xs font-bold",
            isUser 
              ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white" 
              : "bg-gradient-to-br from-purple-500 to-purple-600 text-white"
          )}>
            {username ? username.charAt(0).toUpperCase() : (isUser ? 'S' : 'B')}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Message Container */}
      <div className={cn(
        "flex flex-col gap-2 max-w-[75%] sm:max-w-[65%]",
        isUser ? "items-end" : "items-start"
      )}>
        {/* Username */}
        {username && !isUser && (
          <span className="text-xs text-gray-500 px-3 font-medium">
            {username}
          </span>
        )}

        {/* Message Bubble */}
        <div className={cn(
          "relative px-5 py-4 rounded-3xl shadow-md transition-all duration-300 hover:shadow-lg",
          isUser 
            ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-lg shadow-blue-500/20" 
            : "bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-bl-lg shadow-purple-500/20",
          "backdrop-blur-sm border border-white/10"
        )}>
          {isTyping ? (
            <div className="flex gap-2 items-center py-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-white/80 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-white/80 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-white/80 rounded-full animate-bounce"></div>
              </div>
              <span className="text-sm ml-2 text-white/90 font-medium">yazıyor...</span>
            </div>
          ) : (
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words font-medium">
              {message}
            </p>
          )}

          {/* Message Tail */}
          <div className={cn(
            "absolute top-5 w-4 h-4 transform rotate-45",
            isUser 
              ? "-right-1.5 bg-gradient-to-br from-blue-500 to-blue-600" 
              : "-left-1.5 bg-gradient-to-br from-purple-500 to-purple-600"
          )} />
        </div>

        {/* Timestamp */}
        <span className={cn(
          "text-xs text-gray-400 px-3 font-medium",
          isUser ? "text-right" : "text-left"
        )}>
          {timestamp}
        </span>
      </div>
    </div>
  );
};
