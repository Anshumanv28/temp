export async function sendMessageToApi({ message, userId, conversationId}) {
  const res = await fetch("http://localhost:8000/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id: userId,
      message,
      conversation_id: conversationId
    })
  });
  return res.json();
}
