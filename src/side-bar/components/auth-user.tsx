import React, { useEffect } from 'react'
import { NoEmail } from '../../popup/components/no-email'
import { NoId } from '../../popup/components/no-id'
import { OutOfEco } from '../../popup/components/out-of-eco'
import { LINKS } from '../../shared-components/links'
import { encryptedAndEncodeURLKey, getChatID, getEmailByID, getMetaData } from '../../utils/helpers'
import { Iframe } from './iframe'
import { SideWrapper } from './side-wrapper'

export const AuthUser = ({ name, lastName, email }: {
  name: string,
  lastName: string,
  email: string
}) => {
  const [data, setData] = React.useState<React.ReactNode>(null)

  const fetchData = async (currentUrl: URL) => {
    void chrome.storage.local.get(['currentUrl']).then(async (_) => {
      const url: URL = new URL(currentUrl)
      console.log(url)
      const baseUrl: string = url.origin + url.pathname
      const pathNames: string[] = url.pathname.split('/') ?? []
      const id: string = pathNames[pathNames.length - 1] ?? ''
      const encrypted_email: string = encryptedAndEncodeURLKey(email)

      if (url?.hostname === 'meet.google.com') {
        return
      }

      //TODO CASE 1: LISTING
      if (baseUrl.includes(LINKS['FB4S-LISTINGS']) || baseUrl.includes(LINKS['FB4S-COMMERCIAL-LISTING'])) {
        const metaData: { listingMls: string, listingId: string } = await getMetaData()
        if (metaData.listingMls === 'N/A') {

          const profile_ikey: string = encryptedAndEncodeURLKey(metaData.listingId)
          setData(
            <SideWrapper>
              <Iframe
                url={`74e99d98-a3b8-4cf2-b901-6cac17f48bcf?access_level_key=${encrypted_email}&profile_ikey=${profile_ikey}`}/>
            </SideWrapper>,
          )
          return
        }

        const encrypted_profile_keyFBS: string = encryptedAndEncodeURLKey(metaData.listingMls)
        setData(
          <SideWrapper>
            <Iframe
              url={`74e99d98-a3b8-4cf2-b901-6cac17f48bcf?access_level_key=${encrypted_email}&profile_key=${encrypted_profile_keyFBS}`}/>
          </SideWrapper>,
        )
        return
      } else if (baseUrl.includes(LINKS['FB4S-DASHBOARD'])) {

        //TODO CASE 2: BROKER DASHBOARD

        setData(
          <SideWrapper>
            <Iframe
              url={`cf559bd3-933a-4a04-9687-3ebaa3e0570f?access_level_key=${encrypted_email}`}/>
          </SideWrapper>,
        )
        return
      } else if (baseUrl.includes(LINKS['FB4S-PIPEDRIVE'])) {

        // TODO CASE 3: PIPEDRIVE
        const userEmail: string = await getEmailByID(id)
        if (!userEmail) {
          setData(
            <SideWrapper>
              <NoEmail name={name} lastName={lastName}/>
            </SideWrapper>,
          )
          return
        }
        const encrypted_emailPD: string = encryptedAndEncodeURLKey(userEmail)

        setData(
          <SideWrapper>
            <Iframe
              url={`37827805-e6f2-49a6-a7a1-8577d0d4669a?retool_dashboard_public_key=467f8c24-2333-49fe-9de8-3f58b085939e&profile_ekey=${encrypted_emailPD}`}/>
          </SideWrapper>,
        )
      } else if (baseUrl.includes(LINKS.MANOJ)) {

        // TODO CASE 4: FOLLOWUPBOSS
        const base64: { customFB4SLeadID: string, id: number } = await getChatID(id)
        if (base64 === null) {

          setData(
            //TODO DONE!!!
            <SideWrapper>
              <NoId name={name} lastName={lastName}/>
            </SideWrapper>,
          )
          return
        }
        const data: { chat_id: number } = JSON.parse(atob(base64.customFB4SLeadID))
        const encrypted_chat_id: string = encryptedAndEncodeURLKey(data.chat_id.toString())

        setData(
          <SideWrapper>
            <Iframe
              url={`37827805-e6f2-49a6-a7a1-8577d0d4669a?access_level_key=${encrypted_email}&profile_ikey=${encrypted_chat_id}`}/>
          </SideWrapper>,
        )
        return
      } else {

        //TODO CASE 5: OUT OF ECO
        setData(
          <SideWrapper>
            <OutOfEco name={name} lastName={lastName}/>
          </SideWrapper>,
        )
        return
      }
    })
  }

  useEffect(() => {
    chrome.storage.local.get(['currentUrl'], async (urlRes) => {
      void fetchData(urlRes.currentUrl)
    })

    chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
      const url = new URL(tab.url)
      void fetchData(url)
    })
  }, [])

  return data
}
