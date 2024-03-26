import React from 'react'
import { HoverEffect } from '../../shared-components/cards'
import { TypewriterEffect } from '../../shared-components/typing-text'

const links = [
  {
    title: 'FollowUpBoss Buyer (TM)',
    link: 'https://manojkukreja.followupboss.com/2/people/',
  },
  {
    title: 'FB4S: Dashboard (TM or ISA)',
    link: 'https://www.findbusinesses4sale.com/broker-dashboard/',
  },
  {
    title: 'PipeDrive Buyer (ISA)',
    link: 'https://findbusinessesforsale.pipedrive.com/pipeline',
  },
  {
    title: 'FB4S: Listing (TM or ISA)',
    link: 'https://www.findbusinesses4sale.com/restaurants-for-sale-canada/',
  },
]
export const OutOfEco = ({ name, lastName }: { name: string, lastName: string }) => {
  const text = [
    { text: 'Hello,', className: 'text-sky-100' },
    { text: name, className: 'text-sky-50' },
    { text: lastName, className: 'text-sky-50' },
    { text: '!', className: 'text-sky-50' },
  ]
  const attention = [
    { text: 'Attention!', className: 'text-sky-50 text-3xl font-extrabold' },
  ]
  return (
    <div className="flex flex-col items-center justify-between p-4 pt-0 bg-orange-400 h-screen">
      <div className="relative h-20 flex items-center justify-center w-screen overflow-y-hidden">
        <img src="head.webp" alt="head" className="absolute top-0 left-0 h-20 object-cover"/>
        <img src="logo.webp" alt="logo" className="h-12 mx-auto block relative z-10 pt-1"/>
      </div>
      <h1 className="text-center"><TypewriterEffect words={text}
                                                    className="text-2xl font-bold  small-shadow "/>
      </h1>

      <div className="gap-3 flex flex-col">
        <p className="text-center small-shadow text-sky-50">
          <TypewriterEffect words={attention}
                            className="text-2xl font-bold  small-shadow "/></p>
        <p className="font-bold text-2xl text-center small-shadow text-sky-50">This browser’s page
          is out of the
          ecosystem.</p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-center font-bold text-2xl small-shadow text-sky-50">
          Please open one of these existing pages:
        </p>
        <HoverEffect items={links} className="mt-4"/>
      </div>
    </div>
  )
}