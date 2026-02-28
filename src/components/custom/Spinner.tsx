export const ElegantSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse" />
        <div className="absolute top-2/3 left-1/2 w-1 h-1 bg-white rounded-full animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-300" />
      </div>

      <div className="relative flex flex-col items-center">
        <div className="relative animate-shake">
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            className="drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          >
            <path
              fill="#F3F4F6"
              d="M12,2C12,2 6,6.67 6,14C6,15.1 6.9,16 8,16H16C17.1,16 18,15.1 18,14C18,6.67 12,2Z"
            />
            <circle cx="12" cy="9" r="2" fill="#38BDF8" />
            <path fill="#EF4444" d="M6,14L3,18V14H6M18,14L21,18V14H18" />
            <path
              fill="#EF4444"
              d="M12,2C12,2 9,4.5 8,7H16C15,4.5 12,2 12,2Z"
            />
          </svg>

          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="w-4 h-10 bg-gradient-to-t from-transparent via-orange-500 to-yellow-300 rounded-full animate-flame blur-[1px]" />
            <div className="absolute top-0 w-8 h-12 bg-orange-600/30 rounded-full blur-xl animate-pulse" />
          </div>
        </div>

        <div className="flex gap-4 mt-12 opacity-40">
          <div className="w-12 h-12 bg-gray-600 rounded-full blur-xl animate-ping" />
          <div className="w-16 h-16 bg-gray-400 rounded-full blur-2xl animate-pulse" />
          <div className="w-12 h-12 bg-gray-600 rounded-full blur-xl animate-ping delay-150" />
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500 font-black text-2xl tracking-[0.25em] uppercase">
            Launching
          </h2>
          <p className="text-blue-400/60 text-[10px] tracking-[0.4em] uppercase mt-2 font-bold animate-pulse">
            KEEPIFY - The Products Warranty Tracker
          </p>
        </div>
      </div>
    </div>
  );
};