import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const [history, setHistory] = useState([]);

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
        setHistory
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
        
