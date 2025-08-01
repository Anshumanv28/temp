import Message from "./Message";
export default function MessageList({ messages }) {
  if (!messages || !Array.isArray(messages)) {
    return <div className="flex flex-col gap-2 overflow-y-auto max-h-[500px] p-4">No messages</div>;
  }
  
  return (
    <div className="flex flex-col gap-2 overflow-y-auto max-h-[500px] p-4">
      {messages.map((msg, idx) => (
        <Message key={idx} sender={msg.sender} message={msg.message} />
      ))}
    </div>
  );
}
