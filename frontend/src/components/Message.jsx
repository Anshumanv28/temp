export default function Message({ sender, message }) {
  return (
    <div className={`p-2 my-1 max-w-[70%] rounded-xl ${sender === "user" ? "bg-blue-200 self-end" : "bg-gray-200 self-start"}`}>
      <p className="text-sm">{message}</p>
    </div>
  );
}
