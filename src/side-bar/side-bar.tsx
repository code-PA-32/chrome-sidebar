import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import '../index.css'
import { AuthUser } from './components/auth-user'

const appContainer = document.getElementById('side-bar')


const IframeData = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [data, setData] = useState(null)
  useEffect(() => {
    const checkAuthStatus = async () => {
      const result = await chrome.storage.local.get(['currentUser'])
      if (!result?.currentUser?.isAuth) {
        setIsAuthenticated(false)
        setData(
          <div className="text-center font-bold text-xl">Log In to see more info...</div>,
        )
      } else {
        setIsAuthenticated(true)
        setData(<AuthUser name={result.currentUser.name} email={result.currentUser.email}
                          lastName={result.currentUser.lastName}/>)
      }
    }

    void checkAuthStatus()
  }, [isAuthenticated])
  return data
}

ReactDOM.createRoot(appContainer).render(<IframeData/>)
