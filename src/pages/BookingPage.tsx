import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, Check } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialServiceId = location.state?.serviceId;

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<number | null>(
    initialServiceId || null
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const services = [
    { id: 1, name: "Классический маникюр", duration: 30, price: 1500 },
    { id: 2, name: "Гель-лак", duration: 60, price: 2500 },
    { id: 3, name: "Наращивание ногтей", duration: 120, price: 4000 },
    { id: 4, name: "Педикюр", duration: 60, price: 2000 },
  ];

  const timeSlots = [
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      // Clear data for the current step before going back
      switch (step) {
        case 2:
          setSelectedService(null);
          break;
        case 3:
          setSelectedDate(null);
          break;
        case 4:
          setSelectedTime(null);
          break;
      }
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

  const handleSubmit = () => {
    const selectedServiceData = services.find((s) => s.id === selectedService);
    const appointmentData = {
      appointment_date: selectedDate?.setHours(
        parseInt(selectedTime?.split(":")[0] || "0"),
        parseInt(selectedTime?.split(":")[1] || "0")
      ),
      client_name: formData.name,
      client_email: formData.email,
      client_phone: formData.phone,
      service_name: selectedServiceData?.name,
      price: selectedServiceData?.price,
      duration: selectedServiceData?.duration,
    };

    navigate("/booking/confirmation", {
      state: {
        appointment: appointmentData,
        serviceName: selectedServiceData?.name,
      },
    });
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-6">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`w-3 h-3 rounded-full mx-1 ${
            i === step ? "bg-pink-500" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );

  const renderSummary = () => {
    const selectedServiceData = services.find((s) => s.id === selectedService);

    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h3 className="text-sm font-medium text-gray-500 mb-2">
          Выбранные данные:
        </h3>
        <div className="space-y-2">
          {selectedServiceData && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Услуга:</span>
              <span className="font-medium">{selectedServiceData.name}</span>
            </div>
          )}
          {selectedDate && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Дата:</span>
              <span className="font-medium">
                {format(selectedDate, "d MMMM", { locale: ru })}
              </span>
            </div>
          )}
          {selectedTime && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Время:</span>
              <span className="font-medium">{selectedTime}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const numbers = value.replace(/\D/g, '');
    
    // If empty, return empty string
    if (!numbers) return '';
    
    // Format the number
    let formattedNumber = '';
    if (numbers.length > 0) {
      // Check if number already starts with 7
      const startsWith7 = numbers.startsWith('7');
      formattedNumber = startsWith7 ? '+7 (' : '+7 (';
      formattedNumber += numbers.slice(startsWith7 ? 1 : 0, startsWith7 ? 4 : 3);
    }
    if (numbers.length > (numbers.startsWith('7') ? 4 : 3)) {
      formattedNumber += `) ${numbers.slice(numbers.startsWith('7') ? 4 : 3, numbers.startsWith('7') ? 7 : 6)}`;
    }
    if (numbers.length > (numbers.startsWith('7') ? 7 : 6)) {
      formattedNumber += `-${numbers.slice(numbers.startsWith('7') ? 7 : 6, numbers.startsWith('7') ? 9 : 8)}`;
    }
    if (numbers.length > (numbers.startsWith('7') ? 9 : 8)) {
      formattedNumber += `-${numbers.slice(numbers.startsWith('7') ? 9 : 8, numbers.startsWith('7') ? 11 : 10)}`;
    }
    
    return formattedNumber;
  };

  const validatePhoneNumber = (phone: string) => {
    // Remove all non-digit characters
    const numbers = phone.replace(/\D/g, '');
    // Check if the number has 11 digits and starts with 7
    return numbers.length === 11 && numbers.startsWith('7');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-medium mb-4">Выберите услугу</h2>
            {services.map((service) => (
              <div
                key={service.id}
                className={`p-4 rounded-lg border-2 cursor-pointer ${
                  selectedService === service.id
                    ? "border-pink-500 bg-pink-50"
                    : "border-gray-200 hover:border-pink-300"
                }`}
                onClick={() => {
                  setSelectedService(service.id);
                  handleNext();
                }}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{service.name}</span>
                  {selectedService === service.id && (
                    <Check size={20} className="text-pink-500" />
                  )}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {service.duration} мин • {service.price} ₽
                </div>
              </div>
            ))}
          </div>
        );

      case 2:
        return (
          <div>
            <h2 className="text-lg font-medium mb-4">Выберите дату</h2>
            <div className="grid grid-cols-3 gap-2">
              {[...Array(9)].map((_, i) => {
                const date = new Date();
                date.setDate(date.getDate() + i);
                return (
                  <button
                    key={i}
                    className={`p-3 rounded-lg border ${
                      selectedDate?.toDateString() === date.toDateString()
                        ? "border-pink-500 bg-pink-50"
                        : "border-gray-200 hover:border-pink-300"
                    }`}
                    onClick={() => {
                      setSelectedDate(date);
                      handleNext();
                    }}
                  >
                    <div className="text-sm">
                      {format(date, "EEE", { locale: ru })}
                    </div>
                    <div className="font-medium">
                      {format(date, "d", { locale: ru })}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h2 className="text-lg font-medium mb-4">Выберите время</h2>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  className={`p-3 rounded-lg border ${
                    selectedTime === time
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-200 hover:border-pink-300"
                  }`}
                  onClick={() => {
                    setSelectedTime(time);
                    handleNext();
                  }}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-medium mb-4">Ваши данные</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Имя
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                placeholder="Введите ваше имя"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Телефон
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => {
                  const input = e.target.value;
                  // If user is deleting, allow it
                  if (input.length < formData.phone.length) {
                    setFormData({ ...formData, phone: input });
                    return;
                  }
                  // Format only if user is adding numbers
                  const formatted = formatPhoneNumber(input);
                  setFormData({ ...formData, phone: formatted });
                }}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-transparent ${
                  formData.phone && !validatePhoneNumber(formData.phone)
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
                placeholder="+7 (___) ___-__-__"
                required
              />
              {formData.phone && !validatePhoneNumber(formData.phone) && (
                <p className="text-red-500 text-sm mt-1">
                  Введите корректный номер телефона
                </p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-medium ml-2">Запись на услугу</h1>
        </div>

        {renderStepIndicator()}

        {renderSummary()}

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {renderStep()}
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className="px-6 py-3 border-2 border-pink-500 text-pink-500 rounded-lg font-medium hover:bg-pink-50 transition-colors"
          >
            Назад
          </button>
          {/* // ? ( */}
          {/* //   <button */}
          {/* //     onClick={handleNext}
            //     disabled={
              //       (step === 1 && !selectedService) ||
              //       (step === 2 && !selectedDate) ||
              //       (step === 3 && !selectedTime)
              //     }
              //     className="px-6 py-3 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-colors disabled:bg-gray-300"
              //   >
              //     Далее
              //   </button>
              // ) : ( */}
          {step === 4 && (
            <button
              onClick={handleSubmit}
              disabled={
                !formData.name || 
                !formData.phone || 
                !validatePhoneNumber(formData.phone)
              }
              className="px-6 py-3 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-colors disabled:bg-gray-300"
            >
              Записаться
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
