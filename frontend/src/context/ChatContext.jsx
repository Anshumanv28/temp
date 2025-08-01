import { createContext, useContext, useState, useCallback } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const [history, setHistory] = useState([]);
  const [conversations, setConversations] = useState([]);

  const loadConversations = useCallback(async (userId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/conversations/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setConversations(data.conversations || []);
        // Update history with conversation IDs
        const conversationIds = data.conversations.map(conv => conv.id);
        setHistory(conversationIds);
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  }, []);

  return(
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        loading,
        setLoading,
        userInput,
        setUserInput,
        conversationId,
        setConversationId,
        history,
        setHistory,
        conversations,
        setConversations,
        loadConversations
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
        
