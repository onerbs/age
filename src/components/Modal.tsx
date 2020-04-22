import React from 'react'
import { Flex } from 'theme-ui'
import Shadow from './Shadow'

export default ({
  children,
  close,
  direction = 'row',
  width
}: {
  children: any
  close: () => void
  direction?: 'row' | 'column' | 'initial'
  width?: number[]
}) => (
  <Shadow close={close}>
    <Flex bg='text' color='background' sx={{
      borderRadius: 'default',
      flexDirection: direction,
      flexWrap: 'wrap',
      width: width
    }} children={children} />
  </Shadow>
)
