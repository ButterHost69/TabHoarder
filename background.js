chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    //   console.log('Message received:', message);
    if (message.action === 'save_tabs') {
        chrome.tabs.query({}, async (tabs) => {
            const tabData = await Promise.all(
                tabs.map(async (tab) => {
                    let groupName = null;
                    // Use -1 as a fallback for "no group"
                    if (tab.groupId && tab.groupId >= 0) {
                        try {
                            const groupName = await chrome.tabGroups.get(tab.groupId, async (group) => {
                                return group.title;
                            });
                            console.log("Group", groupName);
                            groupName = groupName || 'Unnamed Group';
                        } catch (error) {
                            console.error('Error fetching tab group:', error);
                        }
                    }
                    return {
                        title: tab.title,
                        url: tab.url,
                        pinned: tab.pinned,
                        groupName
                    };
                })
            );

            const jsonString = JSON.stringify(tabData, null, 2);
            const dataUrl = `data:application/json;charset=utf-8,${encodeURIComponent(jsonString)}`;

            chrome.downloads.download({
                url: dataUrl,
                filename: 'open_tabs.json'
            });

            sendResponse({ success: true });
        });

        // Return true to indicate the response will be sent asynchronously
        return true;
    } else if (message.action === 'save_bookmarks') {
        chrome.bookmarks.getTree((bookmarkTreeNodes) => {
            const bookmarkData = JSON.stringify(bookmarkTreeNodes, null, 2);
            const dataUrl = `data:application/json;charset=utf-8,${encodeURIComponent(bookmarkData)}`;

            chrome.downloads.download({
                url: dataUrl,
                filename: 'bookmarks.json'
            });

            sendResponse({ success: true });
        });

        return true;
    }
});
