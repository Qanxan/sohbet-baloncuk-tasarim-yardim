
import { ChatContainer } from '@/components/chat/ChatContainer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Modern Chat Bubble Tasarımı
          </h1>
          <p className="text-xl text-gray-600">
            Profesyonel ve responsive chat bileşeni
          </p>
        </div>
        
        <div className="flex justify-center">
          <ChatContainer />
        </div>
        
        <div className="mt-8 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-purple-700 mb-2">🎨 Modern Tasarım</h3>
              <p className="text-sm text-gray-600">Gradient renkler ve smooth animasyonlar</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-blue-700 mb-2">📱 Responsive</h3>
              <p className="text-sm text-gray-600">Tüm cihazlarda mükemmel görünüm</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-indigo-700 mb-2">⚡ Hızlı</h3>
              <p className="text-sm text-gray-600">Optimized performans ve smooth UX</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
