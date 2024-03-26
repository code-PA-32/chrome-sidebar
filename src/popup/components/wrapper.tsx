import React from 'react'
import { PanelRightClose, LogOut } from 'lucide-react'
import { Tooltip } from 'react-tooltip'

export const Wrapper = ({ children, setIsAuthenticated, isAuthenticated }: {
  children: React.ReactNode,
  setIsAuthenticated?: (state: boolean) => void
  isAuthenticated?: boolean
}) => {
  const onLogout = async () => {
    await chrome.storage.local.set({
      currentUser: null,
    })
    setIsAuthenticated(false)
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.sidePanel.setOptions({ tabId: tabs[0].id, enabled: false })
      }
    })
  }
  const onOpenSideBar = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        void chrome.sidePanel.setOptions({
          tabId: tabs[0].id,
          enabled: true,
          path: 'side-bar.html',
        })
        chrome.sidePanel.open({ tabId: tabs[0].id }, () => {
          window.close()
        })
      }
    })
  }
  return (
    <div className="w-[500px] h-[600px] relative">
      <button onClick={onOpenSideBar}
              className="absolute top-2 right-16 z-10 p-1 bg-black/60 rounded-md"><PanelRightClose
        className="text-sky-50 rotate-180"
        data-tooltip-id="my-tooltip-open"
        data-tooltip-content="Open sidebar"
        data-tooltip-place="left"
      />
        <Tooltip id="my-tooltip-open"/>
      </button>
      {isAuthenticated && <button onClick={onLogout}
                                  className="absolute top-2 right-5 z-10 p-1 bg-black/60 rounded-md"
      ><LogOut
        className="text-sky-50"
        data-tooltip-id="my-tooltip-logout"
        data-tooltip-content="Logout"
        data-tooltip-place="bottom"
      />
        <Tooltip id="my-tooltip-logout"/>
      </button>}
      {children}
    </div>
  )
}