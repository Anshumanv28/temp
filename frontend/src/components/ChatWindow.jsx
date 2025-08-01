
import MessageList from "./MessageList";
import UserInput from "./UserInput";
import { useChat } from "../context/ChatContext";

export default function ChatWindow({ userId }) {
  const { messages, history, setConversationId, setMessages } = useChat();

  const loadPastConversation = async (cid) => {
    const res = await fetch(`http://localhost:8000/api/conversation/${cid}`);
    const data = await res.json();
    setConversationId(cid);
    setMessages(data.messages);
  };

  return (
    <div className="grid grid-cols-[200px_1fr] h-screen">
      <aside className="bg-gray-100 p-2 border-r">
        <h3 className="font-bold mb-2">History</h3>
        {history.map((cid) => (
          <button
            key={cid}
            onClick={() => loadPastConversation(cid)}
            className="block w-full text-left p-1 hover:bg-gray-200 rounded"
          >
            Conversation #{cid}
          </button>
        ))}
      </aside>

      <main className="flex flex-col">
        <MessageList messages={messages} />
        <UserInput userId={userId} />
      </main>
    </div>
  );
}
