import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import ServiceCard from "../components/ServiceCard";

const ServicesPage: React.FC = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      name: "Классический маникюр",
      description: "Классический маникюр",
      duration: 30,
      price: 1500,
    },
    {
      id: 2,
      name: "Гель-лак",
      description: "Классический маникюр",
      duration: 60,
      price: 2500,
    },
    {
      id: 3,
      name: "Наращивание ногтей",
      description: "Классический маникюр",
      duration: 120,
      price: 4000,
    },
    {
      id: 4,
      name: "Педикюр",
      description: "Классический маникюр",
      duration: 60,
      price: 2000,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-medium ml-2">Наши услуги</h1>
        </div>

        <div className="space-y-4">
          {services.map((service) => (
            <>
              <ServiceCard service={service} />
              {/* <div
                key={service.id}
                className="bg-white rounded-lg shadow-md p-4"
                onClick={() =>
                  navigate("/booking", { state: { serviceId: service.id } })
                }
              >
                <h3 className="text-lg font-medium mb-2">{service.name}</h3>
                <div className="flex justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    <span>{service.duration} мин</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign size={16} className="mr-1" />
                    <span>{service.price} ₽</span>
                  </div>
                </div>
              </div> */}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
