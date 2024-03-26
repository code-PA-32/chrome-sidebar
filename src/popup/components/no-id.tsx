import React from 'react'
import { HoverEffect } from '../../shared-components/cards'
import { TypewriterEffect } from '../../shared-components/typing-text'

const links = [
  {
    title: 'Write an Email',
    link: 'mailto:willow@findbusinesses4sale.ca?subject=Buyer%20does%20not%20have%20FB4S%20ID',
  },
  {
    title: 'Visit FB4S Dashboard',
    link: 'https://www.findbusinesses4sale.com/broker-dashboard/inquiriesleads/all/',
  },
]
export const NoId = ({ name, lastName }: { name: string, lastName: string }) => {
  const text = [
    { text: 'Hello, ', className: 'text-white font-bold' },
    { text: name, className: 'text-white font-bold' },
    { text: lastName, className: 'text-white font-bold' },
    { text: '!', className: 'text-white' },
  ]
  const text2 = [
    { text: 'Attention!', className: 'text-white text-3xl font-extrabold' },
  ]
  return (
    <div className="flex flex-col items-center justify-between p-4 pt-0 bg-orange-400 h-screen">
      <div className="relative h-20 flex items-center justify-center w-screen overflow-y-hidden">
        <img src="head.webp" alt="head" className="absolute top-0 left-0 h-20 object-cover"/>
        <img src="logo.webp" alt="logo" className="h-12 mx-auto block relative z-10 pt-1"/>
      </div>
      <h1 className="text-center">
        <TypewriterEffect words={text}
                          className="text-2xl font-bold small-shadow "/>
      </h1>
      <div className="gap-3 flex flex-col">
        <p className="text-center small-shadow text-sky-50">
          <TypewriterEffect words={text2}
                            className="text-2xl font-bold  small-shadow "/></p>
        <p className="font-bold text-2xl text-center small-shadow text-sky-50">This Buyer does not
          have an FB4S-ID #.</p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-center font-bold text-2xl small-shadow text-sky-50">
          Please inform
          Administration.
        </p>
        <HoverEffect items={links} className="mt-4"/>
      </div>
    </div>
  )
}