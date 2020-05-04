import React, { useRef, useContext } from 'react'
import { Context } from '../lib/context'
import { Input, Flex } from 'theme-ui'
import Shadow from './Shadow'

export default function Clock({close}: {close(): void}) {
  const hour = useRef(document.createElement('input'))
  const minu = useRef(document.createElement('input'))
  const { date, setDate } = useContext(Context)
  const setTime = (h: number, m: number) => {
    setDate(new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(), h, m
    ))
  }
  return (
    <Shadow close={close}>
      <Flex sx={{
        backgroundColor: 'text',
        color: 'background',
        flexDirection: 'column',
        width: [125, 160]
      }}>
        <Input mt={[3, 4]} p={0} max={23}
          ref={hour}
          type="number"
          value={date.getHours()}
          sx={{
            fontFamily: 'body',
            fontSize: [7, 8],
            textAlign: 'center',
            fontWeight: 'heading'
          }}
          onKeyPress={e => { if (e.key === 'Enter') close() }}
          onChange={() => {
            const value = `0${hour.current.value}`
            setTime(parseInt(value), date.getMinutes())
          }}/>
        <Input mb={[3, 4]} p={0} max={59}
          ref={minu}
          type='number'
          value={date.getMinutes()}
          sx={{
            fontFamily: 'body',
            fontSize: [7, 8],
            textAlign: 'center'
          }}
          onKeyPress={e => { if (e.key === 'Enter') close() }}
          onChange={() => {
            const value = `0${minu.current.value}`
            setTime(date.getHours(), parseInt(value))
          }}/>
      </Flex>
    </Shadow>
  )
}
