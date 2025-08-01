
import { useEffect } from "react";
import MessageList from "./MessageList";
import UserInput from "./UserInput";
import { useChat } from "../context/ChatContext";

export default function ChatWindow({ userId }) {
  const { messages, history, setConversationId, setMessages, loadConversations, conversations, conversationId } = useChat();

  useEffect(() => {
    // Load conversations when component mounts
    loadConversations(userId);
  }, [userId]); // Remove loadConversations from dependency array

  const loadPastConversation = async (cid) => {
    try {
      const res = await fetch(`http://localhost:8000/api/conversation/${cid}`);
      if (!res.ok) {
        console.error('Failed to fetch conversation:', res.status);
        return;
      }
      const data = await res.json();
      setConversationId(cid);
      setMessages(data.messages || []);
    } catch (error) {
      console.error('Error loading conversation:', error);
      setMessages([]);
    }
  };

  const startNewConversation = () => {
    setConversationId(null);
    setMessages([]);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  return (
    <div className="grid grid-cols-[200px_1fr] h-screen">
      <aside className="bg-gray-100 p-2 border-r">
        <h3 className="font-bold mb-2">Conversation History</h3>
        
        {/* Start New Conversation Button */}
        <button
          onClick={startNewConversation}
          className="w-full mb-3 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
        >
          + Start New Conversation
        </button>

        {conversations.length === 0 ? (
          <p className="text-sm text-gray-500">No conversations yet</p>
        ) : (
          conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => loadPastConversation(conv.id)}
              className={`block w-full text-left p-2 rounded mb-1 text-sm transition-colors ${
                conv.id === conversationId 
                  ? 'bg-blue-200 border-l-4 border-blue-600' 
                  : 'hover:bg-gray-200'
              }`}
            >
              <div className="font-medium">Conversation #{conv.id}</div>
              <div className="text-xs text-gray-500">{formatDate(conv.started_at)}</div>
            </button>
          ))
        )}
      </aside>

      <main className="flex flex-col">
        <MessageList messages={messages} />
        <UserInput userId={userId} />
      </main>
    </div>
  );
}
