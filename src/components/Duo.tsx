import React from 'react'
import { Flex } from 'theme-ui'

export default function Duo({fs = [4, 5, 6], fw = 'text', children}: {
  fs?: number | number[],
  fw?: string,
  children: any[]
}) {
  return (
    <Flex p={3} sx={{
      fontSize: fs, fontWeight: fw,
      justifyContent: 'space-around',
      alignItems: 'center'
    }}>
      {children.map((c, i) => <span key={`Duo+${i}`}>{c}</span>)}
    </Flex>
  )
}
