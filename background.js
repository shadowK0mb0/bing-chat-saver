// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Check if the message is a request to save the chat history
  if (message.action === "saveChat") {
      // Send a message to the content script to get the chat history
      chrome.tabs.sendMessage(message.tabId, { action: "getChat" }, undefined, (response) => {
        // Check if the response is valid
        if (response && response.chat) {
          // Get the chat history as a string
          let chat = response.chat;
          // Get the file name and type from the message
          let fileName = message.fileName;
          let fileType = message.fileType;
          // Create a blob object from the chat string
          let blob = new Blob([chat], { type: fileType });
          // Create a URL for the blob object
          let url = URL.createObjectURL(blob);
          // Download the file using the URL and the file name
          chrome.downloads.download({
            url: url,
            filename: fileName,
            saveAs: true,
          });
        }
      });
  }
});