import React from 'react'
import { Flex, Text } from 'theme-ui'
import { Check, X } from 'react-feather'

type props = {
  color?: string
  p?: number | number[]
  px?: number | number[]
  py?: number | number[]
  leftAction?: () => void
  leftColor?: string
  LeftIcon?: React.ComponentType<any>
  showLeftIcon?: boolean
  rightAction?: () => void
  rightColor?: string
  RightIcon?: React.ComponentType<any>
  showRightIcon?: boolean
}

export default (props: props) => {
  const {
    color = 'primary',
    p = 0, px, py,
    leftAction = () => {},
    leftColor = '',
    LeftIcon = X,
    showLeftIcon = true,
    rightAction = () => {},
    rightColor = '',
    RightIcon = Check,
    showRightIcon = true,
  } = props
  return (
    <Flex sx={{
      flex: '1',
      justifyContent: 'space-between'
    }}
      px={px ? px : p}
      py={py ? py : p}
    >

    {showLeftIcon ?
      <Text onClick={leftAction}
        color={leftColor ? leftColor : color}
        ><LeftIcon cursor='pointer'/>
      </Text>
    :<span></span>}

    {showRightIcon ?
      <Text onClick={rightAction}
        color={rightColor ? rightColor : color}
        ><RightIcon cursor='pointer'/>
      </Text>
    :<span></span>}

    </Flex>
  )
}
