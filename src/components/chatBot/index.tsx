import { useState, useEffect, useRef } from "react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const RobotChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialMessageSent = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Show welcome message the first time the chat opens
  useEffect(() => {
    if (isOpen && !initialMessageSent.current) {
      setMessages([
        {
          sender: "bot",
          text: "Hi! I'm here to help you learn more about me. Feel free to ask anything!",
        },
      ]);
      initialMessageSent.current = true;
    }
  }, [isOpen]);

  const handleSend = async () => {
    const userText = input.trim();
    if (!userText || loading || cooldown) return;

    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInput("");
    setLoading(true);

    try {
      // Only the visitor's message goes over the wire. The persona and all
      // personal details live server-side in api/chat.js.
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        // Surface whatever the server explained (rate limit, too long, blocked
        // origin). Falling back to a generic message here would hide real
        // misconfiguration behind "please try again".
        const serverMessage = typeof data?.error === "string" ? data.error : null;
        if (!serverMessage) console.error(`Chat request failed: ${response.status}`);
        throw new Error(serverMessage || `Server error: ${response.status}`);
      }

      const botReply = data?.reply;

      if (!botReply) {
        throw new Error("No reply received");
      }

      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            err instanceof Error && !err.message.startsWith("Server error")
              ? err.message
              : "Sorry, I had trouble processing your question. Please try again!",
        },
      ]);
    } finally {
      setLoading(false);
      setCooldown(true);
      setTimeout(() => setCooldown(false), 3000);
    }
  };

  return (
    <>
      {/* Chat Window */}
      <div
        className={`fixed bottom-5 max-sm:left-1/2 max-sm:-translate-x-1/2 sm:right-5 max-w-89 sm:max-w-96 w-full  h-[500px] bg-white rounded-xl shadow-2xl flex flex-col border-2 border-[#d8a013] transition-all duration-300 z-40 origin-bottom-right
    ${
      isOpen
        ? "scale-100 opacity-100 translate-y-0 pointer-events-auto"
        : "scale-95 opacity-0 translate-y-4 pointer-events-none"
    }
  `}
      >
        {/* Header */}
        <div className="bg-[#d8a013] text-black p-4 rounded-t-lg flex justify-between items-center font-semibold">
          <span className="text-black">Chat Assistant</span>
          <button
            onClick={() => setIsOpen(false)}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg max-w-[80%] wrap-break-word text-start ${
                msg.sender === "user"
                  ? "bg-indigo-100 self-end"
                  : "bg-gray-100 self-start"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="text-gray-500 text-sm animate-pulse">
              Thinking...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t flex gap-2">
          <input
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-[1px] focus:ring-black transition-all"
            value={input}
            maxLength={500}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            className="px-4 py-2 bg-[#d8a013] max-sm:hidden duration-300 cursor-pointer hover:bg-[#9e760f] rounded-md disabled:opacity-50"
            onClick={handleSend}
            disabled={loading || cooldown}
            aria-label="Send message"
          >
            Send
          </button>
        </div>
      </div>

      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed duration-300 bottom-5 right-6 bg-[#d8a013] w-18 h-18 sm:w-17 sm:h-17 2xl:w-20 2xl:h-20 2xl:right-15  rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform z-50 ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100 animate-bounce"
        }`}
        aria-label="Open chatbot"
      >
        <svg
          fill="#E5E5E5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="w-16 h-16 sm:w-15 sm:h-15 stroke-[1.5px] stroke-black"
        >
          <g>
            <path d="M49.6,25.8c7.2,0,13,5.8,13,13v3.3c-4.3-0.5-8.7-0.7-13-0.7c-4.3,0-8.7,0.2-13,0.7v-3.3 C36.6,31.7,42.4,25.8,49.6,25.8z"></path>
            <path d="M73.2,63.8l1.3-11.4c2.9,0.5,5.1,2.9,5.1,5.6C79.6,61.2,76.7,63.8,73.2,63.8z"></path>
            <path d="M25.9,63.8c-3.5,0-6.4-2.6-6.4-5.8c0-2.8,2.2-5.1,5.1-5.6L25.9,63.8z"></path>
            <path d="M68.7,44.9c-6.6-0.7-12.9-1-19-1c-6.1,0-12.5,0.3-19,1h0c-2.2,0.2-3.8,2.2-3.5,4.3l2,19.4 c0.2,1.8,1.6,3.3,3.5,3.5c5.6,0.7,11.3,1,17.1,1s11.5-0.3,17.1-1c1.8-0.2,3.3-1.7,3.5-3.5l2-19.4v0C72.4,47,70.9,45.1,68.7,44.9z M38.6,62.5c-1.6,0-2.8-1.6-2.8-3.7s1.3-3.7,2.8-3.7s2.8,1.6,2.8,3.7S40.2,62.5,38.6,62.5z M55.3,66.6c0,0.2-0.1,0.4-0.2,0.5 c-0.1,0.1-0.3,0.2-0.5,0.2h-9.9c-0.2,0-0.4-0.1-0.5-0.2c-0.1-0.1-0.2-0.3-0.2-0.5v-1.8c0-0.4,0.3-0.7,0.7-0.7h0.2 c0.4,0,0.7,0.3,0.7,0.7v0.9h8.1v-0.9c0-0.4,0.3-0.7,0.7-0.7h0.2c0.4,0,0.7,0.3,0.7,0.7V66.6z M60.6,62.5c-1.6,0-2.8-1.6-2.8-3.7 s1.3-3.7,2.8-3.7s2.8,1.6,2.8,3.7S62.2,62.5,60.6,62.5z"></path>
          </g>
        </svg>
      </button>
    </>
  );
};

export default RobotChatbot;
