// Get the buttons and the status element from the popup
let pdfButton = document.getElementById("pdf");
let mdButton = document.getElementById("md");
let status = document.getElementById("status");

// Add click listeners to the buttons
pdfButton.addEventListener("click", () => {
    // check we are on the right page
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry
        var activeTabUrl = tabs[0].url;
        if (activeTabUrl.startsWith("https://www.bing.com/search?q=Bing+AI")) {
            // Send a message to the background script to save the chat as pdf
            chrome.runtime.sendMessage(
                { action: "saveChat", fileName: "chat.pdf", fileType: "application/pdf", tabId: tabs[0].id},
                (response) => {
                    // Show a success message to the user
                    status.textContent = "Chat saved as pdf!";
                }
            );
        } else {
            status.textContent = "Please go to bing CHAT first!";
        }
    });
});

mdButton.addEventListener("click", () => {
    // check we are on the right page
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry
        var activeTabUrl = tabs[0].url;
        if (activeTabUrl.startsWith("https://www.bing.com/search?q=Bing+AI")) {
            // Send a message to the background script to save the chat as markdown
            chrome.runtime.sendMessage(
                { action: "saveChat", fileName: "chat.md", fileType: "text/markdown", tabId: tabs[0].id},
                (response) => {
                    // Show a success message to the user
                    status.textContent = "Chat saved as markdown!";
                }
            );
        } else {
            status.textContent = "Please go to bingo CHAT first!";
        }
    });
});