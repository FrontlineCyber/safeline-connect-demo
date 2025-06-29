const chatToggle = document.getElementById('chat-toggle');
const chatbox = document.getElementById('chatbox');
const sendBtn = document.getElementById('send-btn');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const quotes = [
  '"A true leader has the confidence to stand alone..." – Gen. Douglas MacArthur',
  '"A sound nation is built of individuals sound in body and mind and spirit." – President Dwight D. Eisenhower',
  '"Leadership is a potent combination of strategy and character." – Gen. Norman Schwarzkopf'
];
let quoteIndex = 0;

function rotateQuote() {
  document.getElementById('quote').textContent = quotes[quoteIndex];
  quoteIndex = (quoteIndex + 1) % quotes.length;
}
setInterval(rotateQuote, 5000);
rotateQuote();

chatToggle.addEventListener('click', () => {
  chatbox.classList.toggle('show');
});

sendBtn.addEventListener('click', () => {
  const userInput = chatInput.value.trim();
  if (!userInput) return;

  const userMsg = document.createElement('li');
  userMsg.className = 'user';
  userMsg.textContent = userInput;
  chatMessages.appendChild(userMsg);
  chatInput.value = '';

  setTimeout(() => {
    const botMsg = document.createElement('li');
    botMsg.className = 'bot';
    botMsg.textContent = "I'm here for you. Let's talk about it together.";
    chatMessages.appendChild(botMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 800);
});

document.getElementById('exit-button').addEventListener('click', () => {
  window.location.href = 'https://www.google.com';
});
document.getElementById('exit-button-chat').addEventListener('click', () => {
  window.location.href = 'https://www.google.com';
});
