
import React, { useState, useRef, useEffect } from 'react';
import { ChatBubble } from './ChatBubble';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User, Sparkles, MessageCircle, HelpCircle, Coffee, Lightbulb } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isUser: boolean;
  username?: string;
}

const exampleMessages = [
  {
    icon: MessageCircle,
    text: "Merhaba! Nasıl yardımcı olabilirim?",
    description: "Genel bilgi"
  },
  {
    icon: HelpCircle,
    text: "Ürünleriniz hakkında bilgi alabilir miyim?",
    description: "Ürün sorgusu"
  },
  {
    icon: Coffee,
    text: "Sipariş durumu nasıl kontrol edilir?",
    description: "Sipariş takibi"
  },
  {
    icon: Sparkles,
    text: "Kampanyalardan nasıl haberdar olurum?",
    description: "Kampanyalar"
  }
];

export const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Merhaba! Size nasıl yardımcı olabilirim? Aşağıdaki örnek sorulardan birini seçebilir veya kendi sorunuzu yazabilirsiniz.',
      timestamp: '15:11',
      isUser: false,
      username: 'Website'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showExamples, setShowExamples] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue;
    if (!textToSend.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('tr-TR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      isUser: true,
      username: 'Sen'
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setShowExamples(false);
    
    // Simulate bot typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Teşekkürler! Mesajınızı aldım. Size nasıl yardımcı olabilirim?',
        timestamp: new Date().toLocaleTimeString('tr-TR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        isUser: false,
        username: 'Website'
      };
      setMessages(prev => [...prev, botResponse]);
    }, 2000);
  };

  const handleExampleClick = (text: string) => {
    handleSendMessage(text);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleExamples = () => {
    setShowExamples(!showExamples);
  };

  return (
    <div className="flex flex-col h-[700px] max-w-lg mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden backdrop-blur-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-500/20 backdrop-blur-sm"></div>
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Website Asistanı</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-sm text-white/90">Çevrimiçi</p>
              </div>
            </div>
          </div>
          
          {/* Örnek Sorular Butonu */}
          <Button
            onClick={toggleExamples}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 transition-colors rounded-full px-3 py-2"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Örnek Sorular
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message.text}
              timestamp={message.timestamp}
              isUser={message.isUser}
              username={message.username}
            />
          ))}
          
          {isTyping && (
            <ChatBubble
              message=""
              timestamp=""
              isUser={false}
              username="Website"
              isTyping={true}
            />
          )}

          {/* Example Messages */}
          {showExamples && (
            <div className="mt-6 space-y-3">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-4">Hızlı başlangıç:</p>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {exampleMessages.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleClick(example.text)}
                    className="group flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-purple-50 hover:to-blue-50 rounded-2xl border border-gray-200 hover:border-purple-200 transition-all duration-300 hover:shadow-md text-left"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-100 to-blue-100 group-hover:from-purple-200 group-hover:to-blue-200 rounded-full flex items-center justify-center transition-all duration-300">
                      <example.icon className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700 group-hover:text-purple-700 transition-colors">
                        {example.text}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {example.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-6 border-t border-gray-100 bg-gradient-to-r from-gray-50/50 to-white/50 backdrop-blur-sm">
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Mesajınızı yazın..."
              className="resize-none border-gray-200 focus:border-purple-400 focus:ring-purple-400 rounded-2xl px-4 py-3 bg-white/80 backdrop-blur-sm shadow-sm"
              maxLength={500}
            />
          </div>
          <Button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim()}
            size="icon"
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg transition-all duration-200 hover:shadow-xl rounded-2xl w-12 h-12"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex justify-between items-center mt-3">
          <p className="text-xs text-gray-500">
            Enter ile gönder
          </p>
          <p className="text-xs text-gray-500">
            {inputValue.length}/500
          </p>
        </div>
      </div>
    </div>
  );
};
