import { useChat } from "../context/ChatContext";
import { sendMessageToApi } from "../api/ChatApi";

export default function UserInput({ userId }) {
  const {
    userInput,
    setUserInput,
    setMessages,
    messages,
    setLoading,
    conversationId,
    setConversationId,
    setHistory
  } = useChat();

  const sendMessage = async () => {
    if (!userInput.trim()) return;
    setMessages([...messages, { sender: "user", message: userInput }]);
    setLoading(true);

    const res = await sendMessageToApi({
      message: userInput,
      userId,
      conversationId
    });

    setConversationId(res.conversation_id);
    setMessages([...messages, { sender: "user", message: userInput }, ...res.messages.slice(1)]);
    setLoading(false);
    setUserInput("");
    setHistory((prev) => [...new Set([res.conversation_id, ...prev])]);
  };

  return (
    <div className="flex gap-2 p-2">
      <input
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className="flex-1 border rounded-lg px-2"
        placeholder="Type your message..."
      />
      <button
        onClick={sendMessage}
        className="bg-blue-600 text-white px-4 rounded-lg"
      >
        Send
      </button>
    </div>
  );
}


