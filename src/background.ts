chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    const currentUrl = tab.url ?? ''
    void chrome.storage.local.set({ currentUrl })
  })
})

chrome.tabs.onUpdated.addListener((_, change, tab) => {
  if (tab.active && change.url) {
    void chrome.storage.local.set({ currentUrl: change.url })
  }
})
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    void chrome.storage.local.set({ currentUrl: 'chrome://extensions/' })
  } else if (details.reason === 'update') {
    chrome.tabs.onActivated.addListener((activeInfo) => {
      chrome.tabs.get(activeInfo.tabId, (tab) => {
        const currentUrl = tab.url ?? ''
        void chrome.storage.local.set({ currentUrl })
      })
    })
  }
})

chrome.tabs.onUpdated.addListener((_, change, tab) => {
  if (tab.active && change.url) {
    chrome.runtime.onMessage.addListener((message, _, __) => {
      if (message.listingMls || message.listingId) {
        const metaData = {
          listingMls: message.listingMls,
          listingId: message.listingId,
        }
        void chrome.storage.local.set({
          metaData,
        })
      }
    })
  }
})
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.runtime.onMessage.addListener((message, _, __) => {
      if (message.listingMls || message.listingId) {
        const metaData = {
          listingMls: message.listingMls,
          listingId: message.listingId,
        }
        void chrome.storage.local.set({
          metaData,
        })
      }
    })
  } else if (details.reason === 'update') {
    chrome.runtime.onMessage.addListener((message, _, __) => {
      if (message.listingMls || message.listingId) {
        const metaData = {
          listingMls: message.listingMls,
          listingId: message.listingId,
        }
        void chrome.storage.local.set({
          metaData,
        })
      }
    })
  }
})

chrome.runtime.onMessage.addListener((message, _, __) => {
  if (message.listingMls || message.listingId) {
    const metaData = {
      listingMls: message.listingMls,
      listingId: message.listingId,
    }
    void chrome.storage.local.set({
      metaData,
    })
  }
})