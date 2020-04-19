import React, { useContext, useEffect, useState } from 'react'
import { diff, parse } from './age'
import { Box, Flex } from 'theme-ui'
import Picker from './components/Picker'
import { Context } from './lib/context'

const E = ({children, delay, small=false}: { children: any, delay: number, small?: boolean }) => {
  return (
    <Box className={`${small ? 'small ' : ''}animated`} sx={{
      animationDelay: `${delay}ms`
    }}>{children}</Box>
  )
}

export default () => {
  const { now, date } = useContext(Context)
  const behind = date.getTime() > now.getTime()
  const valueStep = behind ? -1 : 1

  const [value, setValue] = useState(diff(now, date))
  const [parsed, setParser] = useState(parse(value))

  useEffect(() => {
    let i = setInterval(() => {
      setValue(value + valueStep)
      setParser(parse(value))
      console.log('event')
    }, 1000)
    return () => {
      clearInterval(i)
    }
  })

  let delay = 0, delayStep = 120
  return (
    <Flex sx={{
      backgroundImage: "linear-gradient(to right bottom, #111111, #0d0d0d, #090909, #050505, #000000)",
      justifyContent: 'center', alignItems: 'center',
      height: "100vh", fontSize: [0, 1, 2]
    }}>
      <Box sx={{ width: ['auto', '300px', '420px', '600px', '800px'] }} >
        <E delay={delay += delayStep}>{parsed.years} years</E>
        <E delay={delay += delayStep}>{parsed.months} months</E>
        <E delay={delay += delayStep}>{parsed.weeks} weeks</E>
        <E delay={delay += delayStep}>{parsed.days} days</E>
        <E delay={delay += delayStep}>{parsed.hours} hours</E>
        <E delay={delay += delayStep}>{parsed.minutes} minutes</E>
        <E delay={delay += delayStep}>{parsed.seconds} seconds</E>
        <Picker/>
      </Box>
    </Flex>
  )
}
