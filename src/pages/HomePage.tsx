import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail as Nail } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleWebsiteClick = () => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.openLink('https://nail-artistry.netlify.app/');
    } else {
      window.open('https://nail-artistry.netlify.app/', '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-center mb-8">
          <Nail size={32} className="text-pink-500 mr-2" />
          <h1 className="text-2xl font-serif font-medium text-gray-800">NailArtistry</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
          <h2 className="text-xl font-medium text-gray-800 mb-3">
            Добро пожаловать в NailArtistry!
          </h2>
          <p className="text-gray-600">
            Мы рады видеть вас в нашей студии красоты. Создаём неповторимые дизайны ногтей с любовью к каждой детали.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => navigate('/services')}
            className="w-full py-4 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            Познакомиться с услугами
          </button>

          <button
            onClick={() => navigate('/booking')}
            className="w-full py-4 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            Записаться онлайн
          </button>

          <a
            href="https://yandex.ru/maps/213/moscow/house/tverskaya_ulitsa_2/Z04YcAZlSUAAQFtvfXt0dnhhYQ==/?indoorLevel=1&ll=37.619354%2C55.756349&z=17.11"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 border-2 border-pink-500 text-pink-500 hover:bg-pink-50 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            Как добраться
          </a>

          <button
            onClick={handleWebsiteClick}
            className="w-full py-4 border-2 border-pink-500 text-pink-500 hover:bg-pink-50 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            Перейти на сайт
          </button>
        </div>

        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>ул. Красоты, 123, Москва</p>
          <p>Телефон: +7 (495) 123-45-67</p>
          <p>Ежедневно: 9:00 - 21:00</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;