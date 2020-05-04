import React from 'react'
import { Flex } from 'theme-ui'

export default function Shadow({close, children}: {close(): void, children: any}) {
  return (
    <Flex
      sx={{
        alignItems: 'center',
        backdropFilter: 'blur(30px)',
        backgroundColor: 'shadow',
        justifyContent: 'center',
        position: 'absolute',
        top: 0, right: 0, bottom: 0, left: 0
      }}
      onClick={e => { if (e.target === e.currentTarget) close() }}
      children={children}
    />
  )
}
