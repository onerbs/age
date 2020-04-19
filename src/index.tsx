import React, { StrictMode, useEffect, useState } from 'react'
import { render } from 'react-dom'

import { Box, Flex, ThemeProvider } from 'theme-ui'

import { diff, parse } from './age'

const now = new Date()
const jsDateFromHash = () => {
  const hash = window.location.hash.substr(1) || '2020-01-01'
  let yy: number, mm: number, dd: number, HH: number = 0, MM: number = 0, SS: number = 0,
  [date, time] = hash.split('_');
  [yy, mm, dd] = date.split('-').map(e => parseInt(e))
  if (time !== undefined) [HH, MM, SS] = time.split(':').map(e => parseInt(e))
  return new Date(yy, mm-1, dd, HH, MM || 0, SS || 0, 0)
}

const E = ({children, delay, small=false}: { children: any, delay: number, small?: boolean }) => {
  return (
    <Box className={`${small ? 'small ' : ''}animated`} sx={{
      animationDelay: `${delay}ms`
    }}>{children}</Box>
  )
}

const App = () => {
  const date = jsDateFromHash()
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
        <E delay={delay += delayStep} small>
          {`${behind ? 'to' : 'since'} ${date.toLocaleString()}`}
        </E>
      </Box>
    </Flex>
  )
}

render (
  <ThemeProvider theme={{
    breakpoints: ["360px", "480px", "800px", "1024px"],
    colors: { text: "#ddd", background: "#000" },
    fontSizes: [ "2rem", "2.65rem", "3.35rem" ]
  }}>
    <StrictMode>
      <App />
    </StrictMode>
  </ThemeProvider>
  ,
  document.getElementById('root')
)
