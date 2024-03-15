const messageListener = async (request, sender, sendResponse) => {
  console.log("Message from sender!", sender.tab);
  switch (request.type) {
    case "adIsInactive":
      console.log("Ad is no longer active on", request.url);
      await chrome.tabs.update(sender.tab.id, { muted: false });
      break;
    case "adIsActive":
      console.log("Ad is active on", request.url);
      await chrome.tabs.update(sender.tab.id, { muted: true });
      break;
  }
};

chrome.runtime.onMessage.addListener(messageListener);
