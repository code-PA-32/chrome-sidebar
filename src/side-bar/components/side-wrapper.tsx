import { PanelRightClose } from 'lucide-react'
import React from 'react'
import { Tooltip } from 'react-tooltip'

export const SideWrapper = ({ children }: { children: React.ReactNode }) => {
  const onOpenSideBar = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.sidePanel.open({ tabId: tabs[0].id }, () => {
          window.close()
        })
      }
    })
  }
  return (
    <div className="relative flex flex-col items-center justify-center">

      {children}

      <button onClick={onOpenSideBar} className="absolute top-1 right-4 z-50 p-2 bg-black rounded-md">
        <PanelRightClose data-tooltip-id="my-tooltip"
                         data-tooltip-variant="light"
                         data-tooltip-content="Close sidebar"
                         data-tooltip-place="top" className="text-white size-8 relative z-30"/>
      </button>
      <Tooltip id="my-tooltip"/>
    </div>
  )
}