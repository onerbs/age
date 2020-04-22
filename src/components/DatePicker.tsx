import React, { Suspense, lazy, useState, useContext } from 'react'
import { Context } from '../lib/context'

import { Box, Button, Flex } from 'theme-ui'

const Clock = lazy(() => import('./Clock'))
const Calendar = lazy(() => import('./Calendar'))

const zero = (n: number) => `0${n}`.slice(-2)
export default () => {
  const { date, prep, lang } = useContext(Context)
  const [vDate, pickDate] = useState(false)
  const [vTime, pickTime] = useState(false)
  return (
      <Flex sx={{ alignItems: 'center', fontSize: [1, 2] }}>
        <Box p='0 1em' sx={{ opacity: 0.8, fontStyle: 'italic', fontSize: '80%' }}>{prep}</Box>
        <span>
          <Button onClick={() => pickDate(true)}>
            {`${lang.month.abbr[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}
          </Button>
          <Suspense fallback={<span/>}>
            {vDate && <Calendar close={() => pickDate(false)}/> }
          </Suspense>
        </span>
        <span>
          <Button onClick={() => pickTime(true)}>
            {`${zero(date.getHours())}:${zero(date.getMinutes())}`}
          </Button>
          <Suspense fallback={<span/>}>
            {vTime && <Clock close={() => pickTime(false)}/> }
          </Suspense>
        </span>
      </Flex>
  )
}
