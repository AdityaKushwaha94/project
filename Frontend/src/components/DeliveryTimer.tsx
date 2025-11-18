import { useEffect, useState } from "react";
import { Clock, Timer } from "lucide-react";

interface DeliveryTimerProps {
  remainingMinutes: number;
}

const DeliveryTimer = ({ remainingMinutes }: DeliveryTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(remainingMinutes * 60); // Convert to seconds
  
  useEffect(() => {
    setTimeLeft(remainingMinutes * 60);
  }, [remainingMinutes]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (timeLeft <= 0) {
    return (
      <div className="bg-green-100 border border-green-200 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            <Clock className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-green-800">Should be delivered soon!</h3>
            <p className="text-green-600 text-sm">Your order is on its way</p>
          </div>
        </div>
      </div>
    );
  }

  const minutes = Math.floor(timeLeft / 60);
  const isUrgent = minutes < 10;

  return (
    <div className={`border rounded-xl p-4 ${
      isUrgent ? 'bg-orange-50 border-orange-200' : 'bg-blue-50 border-blue-200'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          isUrgent ? 'bg-orange-500' : 'bg-blue-500'
        }`}>
          <Timer className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className={`font-semibold ${isUrgent ? 'text-orange-800' : 'text-blue-800'}`}>
            Estimated delivery time
          </h3>
          <div className="flex items-center gap-2">
            <span className={`text-2xl font-bold ${isUrgent ? 'text-orange-600' : 'text-blue-600'}`}>
              {formatTime(timeLeft)}
            </span>
            <span className={`text-sm ${isUrgent ? 'text-orange-600' : 'text-blue-600'}`}>
              remaining
            </span>
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="mt-3">
        <div className={`w-full bg-gray-200 rounded-full h-2 ${isUrgent ? 'bg-orange-200' : 'bg-blue-200'}`}>
          <div 
            className={`h-2 rounded-full transition-all duration-1000 ${
              isUrgent ? 'bg-orange-500' : 'bg-blue-500'
            }`}
            style={{ 
              width: `${Math.max(0, 100 - (timeLeft / (remainingMinutes * 60)) * 100)}%` 
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Order confirmed</span>
          <span>Delivered</span>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTimer;