// called when the user clicks on the browser action
chrome.browserAction.onClicked.addListener(function (tab) {
    // send a "message" to the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTab = tabs[0]
        chrome.tabs.sendMessage(activeTab.id, { event: 'click' })
    })
})
  
// open a new tab to a given URL
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        const { event, url } = request;
        if (event === 'open_dashboard') {
            chrome.tabs.create({ url, active: true });
        }
    }
)
