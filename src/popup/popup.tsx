import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import '../index.css'
import { encryptedAndEncodeURLKey, getChatID, getEmailByID, getMetaData } from '../utils/helpers'
import { Auth } from './components/auth'
import { Iframe } from './components/iframe'
import { NoEmail } from './components/no-email'
import { NoId } from './components/no-id'
import { OutOfEco } from './components/out-of-eco'
import { Wrapper } from './components/wrapper'
import { LINKS } from '../shared-components/links'

const appContainer = document.getElementById('app')

const IframeData = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  console.log(currentUser)
  const [data, setData] = useState(null)

  useEffect(() => {
    const checkAuthStatus = async () => {
      const result = await chrome.storage.local.get(['currentUser'])
      if (!result?.currentUser?.isAuth) {
        setIsAuthenticated(false)
        setData(
          <div className="w-[500px] h-[600px]">
            <Auth onAuthChange={setIsAuthenticated}/>
          </div>,
        )
      } else {
        setIsAuthenticated(true)
        if (!currentUser) {
          setCurrentUser(result.currentUser)
        }
        chrome.storage.local.get(['currentUrl']).then(async (urlRes) => {
          const url: URL = new URL(urlRes.currentUrl)
          const baseUrl: string = url.origin + url.pathname
          const pathNames: string[] = url.pathname.split('/') ?? []
          const id: string = pathNames[pathNames.length - 1] ?? ''
          const encrypted_email: string = encryptedAndEncodeURLKey(result.currentUser.email)

          //TODO CASE 1: LISTING

          if (baseUrl.includes(LINKS['FB4S-LISTINGS']) || baseUrl.includes(LINKS['FB4S-COMMERCIAL-LISTING'])) {
            const metaData: { listingMls: string, listingId: string } = await getMetaData()
            if (metaData.listingMls === 'N/A') {
              const profile_ikey: string = encryptedAndEncodeURLKey(metaData.listingId)
              setData(
                <Wrapper setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated}>
                  <Iframe
                    url={`74e99d98-a3b8-4cf2-b901-6cac17f48bcf?access_level_key=${encrypted_email}&profile_ikey=${profile_ikey}`}/>
                </Wrapper>,
              )
              return
            }
            const encrypted_profile_keyFBS: string = encryptedAndEncodeURLKey(metaData.listingMls)
            setData(
              <Wrapper setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated}>
                <Iframe
                  url={`74e99d98-a3b8-4cf2-b901-6cac17f48bcf?access_level_key=${encrypted_email}&profile_key=${encrypted_profile_keyFBS}`}/>
              </Wrapper>,
            )
            return
          } else if (baseUrl.includes(LINKS['FB4S-DASHBOARD'])) {

            //TODO CASE 2: BROKER DASHBOARD

            setData(
              <Wrapper setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated}>
                <Iframe
                  url={`cf559bd3-933a-4a04-9687-3ebaa3e0570f?access_level_key=${encrypted_email}`}/>
              </Wrapper>,
            )
            return
          } else if (baseUrl.includes(LINKS['FB4S-PIPEDRIVE'])) {
            // TODO CASE 3: PIPEDRIVE
            const userEmail: string = await getEmailByID(id)
            if (!userEmail) {
              setData(
                <Wrapper setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated}>
                  <NoEmail name={result.currentUser.name} lastName={result.currentUser.lastName}/>
                </Wrapper>,
              )
              return
            }
            const encrypted_emailPD: string = encryptedAndEncodeURLKey(userEmail)
            setData(
              <Wrapper setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated}>
                <Iframe
                  url={`37827805-e6f2-49a6-a7a1-8577d0d4669a?retool_dashboard_public_key=467f8c24-2333-49fe-9de8-3f58b085939e&profile_ekey=${encrypted_emailPD}`}/>
              </Wrapper>,
            )
          } else if (baseUrl.includes(LINKS.MANOJ)) {
            // TODO CASE 4: FOLLOWUPBOSS
            const base64: { customFB4SLeadID: string, id: number } = await getChatID(id)
            if (base64 === null) {
              setData(
                <Wrapper setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated}>
                  <NoId name={result.currentUser.name} lastName={result.currentUser.lastName}/>
                </Wrapper>,
              )
              return
            }
            const data: { chat_id: number } = JSON.parse(atob(base64.customFB4SLeadID))
            const encrypted_chat_id: string = encryptedAndEncodeURLKey(data.chat_id.toString())
            setData(
              <Wrapper setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated}>
                <Iframe
                  url={`37827805-e6f2-49a6-a7a1-8577d0d4669a?access_level_key=${encrypted_email}&profile_ikey=${encrypted_chat_id}`}/>
              </Wrapper>,
            )
            return
          } else {
            //TODO CASE 5: OUT OF ECO
            setData(
              <Wrapper setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated}>
                <OutOfEco name={result.currentUser.name} lastName={result.currentUser.lastName}/>
              </Wrapper>,
            )
            return
          }
        })
      }
    }
    void checkAuthStatus()
  }, [isAuthenticated, currentUser])

  return data
}

ReactDOM.createRoot(appContainer).render(<IframeData/>)
