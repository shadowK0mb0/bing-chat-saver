// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);
  // Check if the message is a request to get the chat history
  if (message.action === "getChat") {
    // Get the chat container element from the page
    var cib_serp = document.querySelector("#b_sydConvCont > cib-serp").shadowRoot;
    var cib_chat_main = cib_serp.querySelector("#cib-conversation-main").shadowRoot.querySelector("#cib-chat-main");
    // Check if the chat container exists
    if (cib_chat_main) {
      var chatMessages = cib_chat_main.querySelectorAll("cib-chat-turn");
      console.log(chatMessages);
      // Check if there are any chat messages
      if (chatMessages.length > 0) {
        // Initialize an empty string for the chat history
        let chat = "";
        // Loop through each chat message element
        for (let message of chatMessages) {
          // Get the sender name, message text and timestamp from the element
          let sender = message.querySelector(".sender-name").textContent;
          let text = message.querySelector(".message-text").textContent;
          let time = message.querySelector(".message-time").textContent;
          // Format the chat message depending on the file type
          if (message.fileType === "application/pdf") {
            // Add a new line and a paragraph with the sender name and time in bold
            chat += `\n<p><b>${sender} (${time}):</b></p>`;
            // Add another paragraph with the message text
            chat += `<p>${text}</p>`;
          } else if (message.fileType === "text/markdown") {
            // Add a new line and a header with the sender name and time
            chat += `\n## ${sender} (${time})`;
            // Add another line and the message text
            chat += `\n${text}`;
          }
        }
        // Send the chat history as a string to the background script
        sendResponse({ chat: chat });
      }
    }
  }
});