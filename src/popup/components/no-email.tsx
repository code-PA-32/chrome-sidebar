import React from 'react'
import { TypewriterEffect } from '../../shared-components/typing-text'

export const NoEmail = ({ name, lastName }: { name: string, lastName: string }) => {
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
          have Email</p>
        <p className="text-center font-bold text-2xl small-shadow text-sky-50">
          Please inform the Developers <br/> (see button).
        </p>
      </div>
      <div className="flex flex-col gap-1 w-full">
        <a href="mailto:oleg.lysytskyi@actse.ltd?subject=Buyer%20does%20not%20have%20Email"
           target="_blank"
           className="text-center bg-lime-500 font-bold small-shadow text-slate-50 w-full p-3 rounded-md hover:bg-black transition duration-300 "
        >Write an Email</a>
      </div>
    </div>
  )
}