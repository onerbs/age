import React, { useContext, useState } from 'react'
import { Context } from '../lib/context'
import { Box, Button, Flex, Text } from 'theme-ui'
import Shadow from './Shadow'

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
    width: cols.map(c => `calc(100% / ${c})`),
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
    <Shadow close={close}>
      <Flex sx={{
        backgroundColor: 'text',
        color: 'background',
        flexDirection: 'column',
        width: [260, 320, 400, 500]
      }}>

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
      </Flex>
    </Shadow>
  )
}

const MonthSelector = ({action, close}: { action: (d: number) => void, close: () => void }) => {
  const { lang, date } = useContext(Context)
  return (
    <Shadow close={close}>
      <Flex bg='text' color='background' sx={{
         borderRadius: 'default',
         flexWrap: 'wrap',
         width: [200, 300]
       }}>
         {
           lang.month.symbol.map((d, i) => (
             <Cell key={`SelectorCell+${d}`} cols={[3]}
               onClick={() => action(i)}
               select={ i === date.getMonth() }>{d}
             </Cell>
           ))
         }
      </Flex>
    </Shadow>
  )
}

class YearRange {
  current: number
  chunk: number[]
  constructor(initial: number) {
    this.current = parseInt(initial.toString().slice(0, 3)) * 10
    this.chunk = seq(this.current + 9, this.current)
  }
  nextChunk(): number[] {
    this.current += 10
    this.chunk = seq(this.current + 9, this.current)
    return this.chunk
  }
  prevChunk(): number[] {
    this.current -= 10
    this.chunk = seq(this.current + 9, this.current)
    return this.chunk
  }
}

const YearSelector = ({action, close}: { action: (d: number) => void, close: () => void }) => {
  const { date } = useContext(Context)
  const range = useState(new YearRange(date.getFullYear()))[0]
  const [chunk, setChunk] = useState(range.chunk)
  return (
    <Shadow close={close}>
      <Box color='text' p={3} sx={{ cursor: 'pointer' }}
        onClick={() => { setChunk(range.prevChunk()) }}
      >
        &lt;-
      </Box>
      <Flex bg='text' color='background' sx={{
         borderRadius: 'default',
         flexWrap: 'wrap',
         width: [120, 180]
       }}>
         {
           chunk.map(d => (
             <Cell key={`SelectorCell+${d}`} cols={[2]}
               onClick={() => action(d)}
               select={ d === date.getFullYear() }>{d}
             </Cell>
           ))
         }
      </Flex>
      <Box color='text' p={3} sx={{ cursor: 'pointer' }}
        onClick={() => { setChunk(range.nextChunk()) }}
      >
        -&gt;
      </Box>
    </Shadow>
  )
}
