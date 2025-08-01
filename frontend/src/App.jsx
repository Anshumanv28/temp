
import ChatWindow from "./components/ChatWindow";
import { ChatProvider } from "./context/ChatContext";

function App() {
  const userId = 1; // hardcoded for demo purposes
  return (
    <ChatProvider>
      <ChatWindow userId={userId} />
    </ChatProvider>
  );
}

export default App;
