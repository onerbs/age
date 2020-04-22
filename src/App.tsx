import React, { useContext, useEffect, useState } from 'react'
import { Box, Flex } from 'theme-ui'
import DatePicker from './components/DatePicker'
import { Context } from './lib/context'

import { parse } from './lib/age'

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

export default () => {
  const { lang, timeDiff } = useContext(Context)
  const [diff, setDiff] = useState(parse(0))

  useEffect(() => {
    setDiff(parse(timeDiff))
  }, [timeDiff])

  let delayStep = 120
  let delay = -delayStep
  const stepDelay = (): number => delay += delayStep

  return (
    <Flex sx={{
      fontFamily: 'body',
      alignItems: 'center',
      backgroundImage: "linear-gradient(to right bottom, #111111, #0d0d0d, #090909, #050505, #000000)",
      fontSize: [3, 4, 5, 6],
      height: "100vh",
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      <Flex sx={{
        width: ['250px', '300px', '420px', '650px', '730px'],
        flexDirection: ['column', 'column', 'column', 'row'],
        justifyContent: ['flex-start', 'flex-start', 'flex-start', 'space-between']
      }}>
        <Box>
          <E delay={stepDelay()}>{diff.years} {lang.age.year(diff.years)}</E>
          <E delay={stepDelay()}>{diff.months} {lang.age.month(diff.months)}</E>
          <E delay={stepDelay()}>{diff.weeks} {lang.age.week(diff.weeks)}</E>
          <E delay={stepDelay()}>{diff.days} {lang.age.day(diff.days)}</E>
        </Box>
        <Box sx={{ textAlign: ['left', 'left', 'left', 'right'] }}>
          <E delay={stepDelay()}>{diff.hours} {lang.age.hour(diff.hours)}</E>
          <E delay={stepDelay()}>{diff.minutes} {lang.age.minute(diff.minutes)}</E>
          <E delay={stepDelay()}>{diff.seconds} {lang.age.second(diff.seconds)}</E>
        </Box>
      </Flex>
      <DatePicker/>
    </Flex>
  )
}
