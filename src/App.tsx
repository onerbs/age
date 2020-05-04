import React, { useContext, useEffect, useState } from 'react'
import { Box, Flex } from 'theme-ui'
import DatePicker from './components/DatePicker'
import { Context } from './lib/context'

import { parse } from './lib/age'
import Linguas from './components/Linguas'

const E = ({
  children,
  delay,
  small=false
}: {
  children: any,
  delay: number,
  small?: boolean
}) => {
  return (
    <Box className={`${small ? 'small ' : ''}animated`} sx={{
      animationDelay: `${delay}ms`
    }}>{children}</Box>
  )
}

export default function App() {
  const { lang, timeDiff } = useContext(Context)
  const [diff, setDiff] = useState(parse(0))

  useEffect(() => {
    setDiff(parse(timeDiff))
  }, [timeDiff])

  let step = 120
  let delayQ = -step
  function delay(): number {
    return delayQ += step
  }

  return (<>
    <Linguas/>
    <Flex sx={{
      fontFamily: 'body',
      alignItems: 'center',
      backgroundImage: 'linear-gradient(to right bottom, #111111, #0d0d0d, #090909, #050505, #000000)',
      fontSize: [3, 4, 5, 6],
      height: '100vh',
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      <Flex sx={{
        width: ['250px', '300px', '420px', '650px', '730px'],
        flexDirection: ['column', 'column', 'column', 'row'],
        justifyContent: ['flex-start', 'flex-start', 'flex-start', 'space-between']
      }}>
        <Box>
          <E delay={delay()}>{diff.years} {lang.age.year(diff.years)}</E>
          <E delay={delay()}>{diff.months} {lang.age.month(diff.months)}</E>
          <E delay={delay()}>{diff.weeks} {lang.age.week(diff.weeks)}</E>
          <E delay={delay()}>{diff.days} {lang.age.day(diff.days)}</E>
        </Box>
        <Box sx={{ textAlign: ['left', 'left', 'left', 'right'] }}>
          <E delay={delay()}>{diff.hours} {lang.age.hour(diff.hours)}</E>
          <E delay={delay()}>{diff.minutes} {lang.age.minute(diff.minutes)}</E>
          <E delay={delay()}>{diff.seconds} {lang.age.second(diff.seconds)}</E>
        </Box>
      </Flex>
      <DatePicker/>
    </Flex>
  </>)
}
