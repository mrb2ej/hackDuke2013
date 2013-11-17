

// Called when the url of a tab changes.
function checkForEbayUrl(tabId, changeInfo, tab) {
  // If the tab is on an ebay item...
  if (tab.url.indexOf('ebay.com/itm') > -1) {
	// show page action
    chrome.pageAction.show(tabId);
	chrome.pageAction.tommy = "test";
  }
};


// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForEbayUrl);
