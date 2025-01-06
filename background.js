chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Message received:', message);
    if (message.action === 'save_tabs') {
      chrome.tabs.query({}, (tabs) => {
        const tabData = tabs.map(tab => ({
          title: tab.title,
          url: tab.url
        }));
        
        console.log('Tabs:', tabData);
        // Convert tab data to JSON string
        const jsonString = JSON.stringify(tabData, null, 2);
  
        // Create a data URL for the JSON content
        const dataUrl = `data:application/json;charset=utf-8,${encodeURIComponent(jsonString)}`;
  
        // Use chrome.downloads API to download the file
        chrome.downloads.download({
          url: dataUrl,
          filename: 'open_tabs.json'
        });
  
        sendResponse({ success: true });
      });
  
      // Return true to indicate the response will be sent asynchronously
      return true;
    }
  });
  