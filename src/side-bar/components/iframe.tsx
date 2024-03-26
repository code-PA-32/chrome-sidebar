import React from 'react'

interface IframeProps {
  url: string;
}

export const Iframe = ({ url }: IframeProps) => <iframe src={`https://findbusinesses4sale.retool.com/embedded/public/${url}`} className="h-screen w-screen"/>
