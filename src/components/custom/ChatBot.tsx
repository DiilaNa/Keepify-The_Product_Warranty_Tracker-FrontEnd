import { useState } from "react";

const Chatbot = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "60px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#2d23d9ff",
          color: "white",
          fontWeight: "bold",
          border: "none",
          cursor: "pointer",
          zIndex: 9999,
        }}
      >
        💬
      </button>

      {/* Chat iframe */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "120px",
            right: "30px",
            width: "350px",
            height: "500px",
            boxShadow: "0 4px 16px rgba(27, 116, 176, 0.2)",
            borderRadius: "12px",
            overflow: "hidden",
            zIndex: 9998,
          }}
        >
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/aPGQj0tfz73-P_bO6w9Bj"
            width="100%"
            height="100%"
            style={{ border: "none" }}
            title="Keepify AI Assistant"
          />
        </div>
      )}
    </>
  );
};

export default Chatbot;
