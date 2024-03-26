import React from 'react'

interface IframeProps {
  url: string;
}

export const Iframe = ({ url }: IframeProps) => <iframe
  src={`https://findbusinesses4sale.retool.com/embedded/public/${url}`} width="500px"
  height="600px"/>
