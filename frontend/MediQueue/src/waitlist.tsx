import React from "react";

import Wave from "./wave";

const QueueDisplay: React.FC = () => {
  return (
    <div className="fixed inset-0 flex justify-center h-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-800 to-blue-900">
        {/* Main Content */}
        <div className="w-full max-w px-6 sm:px-8 relative z-10">
          {/* Header */}
          <div className="flex justify-between items-center pt-8 sm:pt-12">

          </div>

          {/* Queue Info */}
          <div className="mt-16 sm:mt-24 text-center text-white flex flex-col space-y-6 items-center justify-center">
            <div className="text-6xl sm:text-8xl font-bold">5</div>
            <div className="text-lg font-medium">on Queue</div>
            <div className="text-5xl sm:text-6xl font-bold">5:00</div>
            <div className="text-lg font-medium">estimated time</div>
          </div>
        </div>

        {/* Background Gradients and Wave */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-800 to-blue-900 opacity-50"></div>
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-blue-600 to-transparent animate-wave"></div>
        </div>
      </div>

      {/* Wave Component */}
      <Wave />
    </div>
  );
};

export default QueueDisplay;
