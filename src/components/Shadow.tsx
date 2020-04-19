import React from 'react'
import { Flex } from 'theme-ui'

export default (props: any) =>
<Flex
  sx={{
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0, right: 0, bottom: 0, left: 0,
    backgroundColor: 'shadow',
    backdropFilter: 'blur(30px)',
    ...props.sxx
  }}
  onClick={e => { if (e.target === e.currentTarget && props.close) props.close() }}
  {...props}
/>