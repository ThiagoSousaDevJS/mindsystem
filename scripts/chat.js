// Abrir/fechar chat
const chatToggle = document.getElementById("chat-toggle");
const chatbot = document.getElementById("chatbot");

chatToggle.addEventListener("click", () => {
  chatbot.style.display = chatbot.style.display === "flex" ? "none" : "flex";
});

// Simular envio de mensagens
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBody = document.getElementById("chat-body");

sendBtn.addEventListener("click", () => {
  const text = userInput.value.trim();
  if (text !== "") {
    // adiciona msg do usuário
    const userMsg = document.createElement("div");
    userMsg.classList.add("message", "user");
    userMsg.textContent = text;
    chatBody.appendChild(userMsg);

    userInput.value = "";

    // resposta fake do bot
    setTimeout(() => {
      const botMsg = document.createElement("div");
      botMsg.classList.add("message", "bot");
      botMsg.textContent = "Recebi sua mensagem: " + text;
      chatBody.appendChild(botMsg);

      chatBody.scrollTop = chatBody.scrollHeight;
    }, 500);
  }
});
