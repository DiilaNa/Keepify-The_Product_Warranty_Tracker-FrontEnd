import { useState } from "react";

const Chatbot = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-16 right-5 w-14 h-14 sm:w-12 sm:h-12 rounded-full bg-blue-900 text-white font-bold border-none cursor-pointer z-50 flex items-center justify-center text-xl sm:text-lg"
      >
        💬
      </button>

      {open && (
        <div className="fixed bottom-32 right-7 w-[90vw] max-w-[450px] h-[70vh] max-h-[500px] sm:w-[85vw] sm:h-[65vh] md:w-[400px] md:h-[450px] lg:w-[450px] lg:h-[500px] shadow-md rounded-xl overflow-hidden z-40 transition-all duration-300">
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/aPGQj0tfz73-P_bO6w9Bj"
            width="100%"
            height="100%"
            className="border-none"
            title="Keepify AI Assistant"
          />
        </div>
      )}
    </>
  );
};

export default Chatbot;
