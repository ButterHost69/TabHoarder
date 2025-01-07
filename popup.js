document.getElementById('saveTabs').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'save_tabs' });
  console.log('Sending message: save_tabs');
});

document.getElementById('saveBookmarks').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'save_bookmarks' });
  console.log('Sending message: save_bookmarks');
});
