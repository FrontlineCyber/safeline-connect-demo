const chatToggle = document.getElementById('chat-toggle');
const chatbox = document.getElementById('chatbox');
const sendBtn = document.getElementById('send-btn');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const exitBtns = [document.getElementById('exit-button'), document.getElementById('exit-button-chat')];

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

exitBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    fetch('/.netlify/functions/logPanic', { method: 'POST' });
    window.location.href = 'https://www.google.com';
  });
});

sendBtn.addEventListener('click', async () => {
  const userInput = chatInput.value.trim();
  if (!userInput) return;

  const userMsg = document.createElement('li');
  userMsg.className = 'user';
  userMsg.textContent = userInput;
  chatMessages.appendChild(userMsg);
  chatInput.value = '';

  const botMsg = document.createElement('li');
  botMsg.className = 'bot';
  botMsg.textContent = 'Typing...';
  chatMessages.appendChild(botMsg);

  const response = await fetch('/.netlify/functions/chatbot', {
    method: 'POST',
    body: JSON.stringify({ message: userInput }),
  });

  const data = await response.json();
  botMsg.textContent = data.reply;
});
