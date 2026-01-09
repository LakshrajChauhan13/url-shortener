import { toast } from 'sonner';
import { useEffect, useState } from 'react';

// Custom countdown component
export const CountdownToast = ({ onUndo, initialTime = 5 }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <div className="bg-white border-2 border-slate-200 rounded-xl shadow-lg p-4 min-w-[320px] max-w-md">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          {/* Icon */}
          <div className="flex-shrink-0">
            <svg 
              className="w-5 h-5 text-orange-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          
          {/* Text */}
          <div className="flex-1">
            <span className="text-sm text-slate-700 font-medium">
              Deleting in{' '}
              <span className="text-red-500 font-bold tabular-nums">
                {timeLeft}
              </span>
              {' '}second{timeLeft !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Undo Button */}
        <button
          onClick={onUndo}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 active:bg-red-700 font-medium text-sm transition-colors duration-200 whitespace-nowrap shadow-sm hover:shadow-md"
        >
          Undo
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mt-3 h-1 bg-slate-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-red-500 transition-all duration-1000 ease-linear"
          style={{ 
            width: `${(timeLeft / initialTime) * 100}%` 
          }}
        />
      </div>
    </div>
  );
};


//   return (
//     <div 
//       className="group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border border-slate-200 bg-white p-4 pr-6 shadow-lg transition-all"
//       data-sonner-toast=""
//     >
//       <div className="flex gap-3 items-center">
//         <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100">
//           <svg className="h-3 w-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//           </svg>
//         </div>
//         <div className="flex-1">
//           <div className="text-sm font-semibold text-slate-900">
//             Deleting in <span className="text-red-600">{timeLeft}</span> seconds
//           </div>
//         </div>
//       </div>
//       <button
//         onClick={onUndo}
//         className="px-3 py-1.5 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 font-medium transition-colors shrink-0"
//       >
//         Undo
//       </button>
//     </div>
//   );
// };