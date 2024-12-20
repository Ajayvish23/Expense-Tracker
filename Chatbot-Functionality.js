// Chatbot Functionality
const chatbotBtn = document.getElementById('chatbot-btn');
const chatWindow = document.getElementById('chat-window');
const closeChatBtn = document.getElementById('close-chat');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');
const sendBtn = document.getElementById('send-btn');

// Show Chat Window
chatbotBtn.addEventListener('click', () => {
    chatWindow.classList.remove('hidden');
    chatbotBtn.style.display = 'none';
});

// Close Chat Window
closeChatBtn.addEventListener('click', () => {
    chatWindow.classList.add('hidden');
    chatbotBtn.style.display = 'block';
});

// Handle Sending Messages
sendBtn.addEventListener('click', () => {
    const userInput = chatInput.value.trim();
    if (userInput) {
        // Add user message
        addMessage(userInput, 'user');

        // Process bot response
        const botResponse = getBotResponse(userInput); // Replace this with your AI logic
        setTimeout(() => {
            addMessage(botResponse, 'bot');
        }, 1000);

        // Clear input field
        chatInput.value = '';
    }
});

// Add Message to Chat
function addMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.innerText = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the latest message
}

// Sample Bot Response Logic
function getBotResponse(input) {
    if (input.toLowerCase().includes('suggestion')) {
        return 'I suggest you review your highest spending category and set a budget.';
    } else if (input.toLowerCase().includes('hello')) {
        return 'Hello! How can I assist you with your expenses today?';
    } else {
        return "Under maintenance!";
    }
}
