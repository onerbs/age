import React, { useRef, useContext } from 'react'
import { Context } from '../lib/context'
import { Input } from 'theme-ui'
import Modal from './Modal'

export default ({close}: { close: () => void }) => {

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
    <Modal close={close} width={[125, 160]}>
      <Input ref={hour} type='number' max={23} value={date.getHours()} p={0} mt={[3, 4]}
        sx={{ fontFamily: 'body', fontSize: [7, 8], textAlign: 'center', fontWeight: 'heading' }}
        onKeyPress={e => { if (e.key === 'Enter') close() }}
        onChange={() => {
          const value = `0${hour.current.value}`
          setTime(parseInt(value), date.getMinutes())
        }}
        />
      <Input ref={minu} type='number' max={59} value={date.getMinutes()} p={0} mb={[3, 4]}
        sx={{ fontFamily: 'body', fontSize: [7, 8], textAlign: 'center' }}
        onKeyPress={e => { if (e.key === 'Enter') close() }}
        onChange={() => {
          const value = `0${minu.current.value}`
          setTime(date.getHours(), parseInt(value))
        }}
        />
    </Modal>
  )
}
