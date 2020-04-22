import React, { useContext, useState } from 'react'
import { Context } from '../lib/context'
import { Box, Button, Flex, Text } from 'theme-ui'
import Modal from './Modal'

const Cell = ({
  bold = false,
  children,
  cols,
  dim = false,
  onClick,
  select = false,
}: {
  bold?: boolean
  children: any
  cols: number[]
  dim?:boolean
  onClick?: () => void
  select?: boolean
}) => (
  <Box as='span' py={[2]} sx={{ color: select ? 'secondary' : 'inherit',
    flexBasis: cols.map(c => `calc(100% / ${c})`),
    textAlign: 'center',
    opacity: dim ? 0.8 : 1,
    fontWeight: select || bold ? 'bold' : 'inherit',
  }} onClick={onClick} children={children}/>
)

const seq = (O: number, A = 1) => {
  let seq = []; for (let i = A; i <= O; i++) seq.push(i)
  return seq
}

export default ({close}: { close: () => void }) => {
  const { lang, date, setDate } = useContext(Context)
  const [sMonth, selectMonth] = useState(false)
  const [sYear, selectYear] = useState(false)

  const _pick = (y: number, m: number, d: number) => {
    setDate(new Date(
      y, m, d, date.getHours(),
      date.getMinutes(), 0, 0
    ))
  }
  const pickYear = (year: number) => {
    _pick(year, date.getMonth(), date.getDate())
  }
  const pickMonth = (month: number) => {
    _pick(date.getFullYear(), month, date.getDate())
  }
  const pickDate = (day: number) => {
    _pick(date.getFullYear(), date.getMonth(), day)
  }

  return (
    <Modal close={close} width={[260, 320, 400, 500]}>

      <Flex my={2} sx={{ fontSize: [1, 2], justifyContent: 'space-around', width: '100%' }}>
        <Button variant='secondary' onClick={() => { selectMonth(true) }}>{lang.month.symbol[date.getMonth()]}</Button>
        <Button variant='secondary' onClick={() => { selectYear(true) }}>{date.getFullYear()}</Button>
      </Flex>

      <Flex sx={{ flexWrap: 'wrap' }}>
        {lang.day.symbol.map(l =>
          <Cell cols={[7]} key={`LangDaySymbol+${l}`} bold>{l}</Cell>
        )}
        {seq(31, 29).map(n => <Cell cols={[7]} key={`DisabledCell+${n}`} dim>{n}</Cell>)}
        {seq(30).map(n =>
          <Cell cols={[7]} key={`EnabledCell+${n}`}
            onClick={() => { pickDate(n) }}
            select={ n === date.getDate() }>{n}
          </Cell>
        )}
        {seq(9).map(n => <Cell cols={[7]} key={`DisabledCell+${n}`} dim>{n}</Cell>)}
      </Flex>

      <Box py={2} px={[2, 3]} sx={{ width: '100%', textAlign: 'right' }}>
        <Text as='span' color='secondary' onClick={close} sx={{ cursor: 'pointer' }}>
          <svg width='1.25em' viewBox="0 0 24 24" fill='currentColor'>
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
          </svg>
        </Text>
      </Box>

      { sMonth && <MonthSelector action={pickMonth} close={() => { selectMonth(false) }}/> }
      { sYear && <YearSelector action={pickYear} close={() => { selectYear(false) }}/> }
    </Modal>
  )
}

const Selector = ({
  action,
  close,
  data,
  cols,
  width,
  match
}: {
  action: (e: number) => void
  close: () => void
  data: Array<string | number>
  cols: number[]
  width: number[]
  match: number
}) => {
  return (
    <Modal width={width} direction='initial' close={close}>
      {
        data.map((d, i) => (
          <Cell key={`SelectorCell+${d}`} cols={cols}
            onClick={() => action(typeof d === 'string' ? i : d)}
            select={ i === match || d === match }>{d}
          </Cell>
        ))
      }
    </Modal>
  )
}
const MonthSelector = ({action, close}: { action: (d: number) => void, close: () => void }) => {
  const { lang, date } = useContext(Context)
  return (
    <Selector
      action={action}
      close={close}
      cols={[3]}
      data={lang.month.symbol}
      match={date.getMonth()}
      width={[200, 300]} />
  )
}
const YearSelector = ({action, close}: { action: (d: number) => void, close: () => void }) => {
  const { date } = useContext(Context)
  let from = parseInt(date.getFullYear().toString().slice(0, 3)) * 10
  return (
    <Selector
      action={action}
      close={close}
      cols={[2]}
      data={seq(from + 9, from)}
      match={date.getFullYear()}
      width={[120, 180]} />
  )
}
