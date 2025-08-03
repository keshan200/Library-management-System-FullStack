import React, { useState, useEffect } from 'react';
import { Clock, Calendar } from 'lucide-react';

const LibraryDateTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div >

      {/* Date and Time Container */}
      <div className="space-y-4 flex items-center justify-between">
        {/* Date Section */}
       
      <div className='flex items-center justify-between gap-4'> 
        <div className="flex items-center space-x-3 bg-white rounded-xl p-4 shadow-sm">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Today's Date</p>
            <p className="text-lg font-semibold text-gray-800">
              {formatDate(currentTime)}
            </p>
          </div>
        </div>

        {/* Time Section */}
        <div className="flex items-center space-x-3 bg-white rounded-xl p-4 shadow-sm">
          <div className="p-2 bg-green-100 rounded-lg">
            <Clock className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Current Time</p>
            <p className="text-2xl font-bold text-gray-800 font-mono tracking-wide">
              {formatTime(currentTime)}
            </p>
          </div>
        </div>
      </div>
    </div>

    </div>
  );
};

export default LibraryDateTime;