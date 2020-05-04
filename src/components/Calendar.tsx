import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../lib/context'
import { Box, Button, Flex, Text } from 'theme-ui'
import Shadow from './Shadow'

function Cell({
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
  onClick?(): void
  select?: boolean
}) {
  return (
    <Box as="span" py={[2]} sx={{
      color: select ? 'secondary' : 'inherit',
      fontWeight: select || bold ? 'bold' : 'inherit',
      opacity: dim ? 0.8 : 1,
      textAlign: 'center',
      width: cols.map(c => `calc(100% / ${c})`),
    }} onClick={onClick} children={children}/>
  )
}

function seq(end: number, begin = 1) {
  let seq: number[] = []
  for (let i = begin; i <= end; i++) {
    seq.push(i)
  }
  return seq
}

const board = 42 // 6 * 7
export default function Calendar({close}: {close(): void}) {
  const {lang, date, setDate} = useContext(Context)
  const [sMonth, selectMonth] = useState(false)
  const [sYear, selectYear] = useState(false)

  const [prev, setPrev] = useState([0])
  const [current, setCurrent] = useState(0)
  function populate() {
    const [year, month] = [date.getFullYear(), date.getMonth()]
    let c = new Date(year, month + 1, 0).getDate()
    let p1 = new Date(year, month, 0).getDate()
    let p2 = p1 - date.getDay() + 1
    let p3 = board - (c + (p1 - p2 + 1))
    setPrev([p1, p2, p3])
    setCurrent(c)
  }
  useEffect(() => { populate() }, [date])

  function pick(y: number, m: number, d: number) {
    setDate(new Date(y, m, d, date.getHours(), date.getMinutes(), 0, 0))
  }
  function pickYear(year: number) {
    pick(year, date.getMonth(), date.getDate())
  }
  function pickMonth(month: number) {
    pick(date.getFullYear(), month, date.getDate())
  }
  function pickDate(day: number) {
    pick(date.getFullYear(), date.getMonth(), day)
  }

  return (
    <Shadow close={close}>
      <Box color='text' p={3} sx={{ cursor: 'pointer' }}
        onClick={() => { pickMonth(date.getMonth() - 1) }}
      >&lt;-</Box>

      <Flex sx={{
        backgroundColor: 'text',
        color: 'background',
        flexDirection: 'column',
        width: [260, 320, 400, 500]
      }}>
        <Flex my={2} sx={{fontSize: [1, 2], justifyContent: 'space-around', width: '100%'}}>
          <Button variant='secondary'
            onClick={() => { selectMonth(true) }}
          >{lang.month.symbol[date.getMonth()]}</Button>
          <Button variant='secondary'
            onClick={() => { selectYear(true) }}
          >{date.getFullYear()}</Button>
        </Flex>

        <Flex sx={{ flexWrap: 'wrap' }}>
          {lang.day.symbol.map(l =>(
            <Cell cols={[7]} key={`ds+${l}`} bold>{l}</Cell>
          ))}
          {seq(prev[0], prev[1]).map(n => (
            <Cell cols={[7]} key={`d+${n}`} dim>{n}</Cell>
          ))}
          {seq(current).map(n => (
            <Cell cols={[7]} key={`e+${n}`}
              onClick={() => { pickDate(n) }}
              select={n === date.getDate()}>{n}
            </Cell>
          ))}
          {seq(prev[2]).map(n => (
            <Cell cols={[7]} key={`d+${n}`} dim>{n}</Cell>
          ))}
        </Flex>

        <Box py={2} px={[2, 3]} sx={{ width: '100%', textAlign: 'right' }}>
          <Text color='secondary' onClick={close} sx={{ cursor: 'pointer' }}>
            <svg width='1.25em' viewBox="0 0 24 24" fill='currentColor'>
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
            </svg>
          </Text>
        </Box>

        {sMonth && (
          <MonthSelector
            action={pickMonth}
            close={() => { selectMonth(false) }}
          />
        )}
        {sYear && (
          <YearSelector
            action={pickYear}
            close={() => { selectYear(false) }}
          />
        )}
      </Flex>

      <Box color='text' p={3} sx={{ cursor: 'pointer' }}
        onClick={() => { pickMonth(date.getMonth() + 1) }}
      >-&gt;</Box>
    </Shadow>
  )
}

function MonthSelector({action, close}: { action(d: number): void, close(): void }) {
  const { lang, date } = useContext(Context)
  return (
    <Shadow close={close}>
      <Flex bg='text' color='background' sx={{
        borderRadius: 'default',
        flexWrap: 'wrap',
        width: [200, 300]
      }}>
        {lang.month.symbol.map((d, i) => (
          <Cell key={`s+${d}`} cols={[3]}
            onClick={() => action(i)}
            select={ i === date.getMonth() }>{d}
          </Cell>
        ))}
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
      >&lt;-</Box>
      <Flex bg='text' color='background' sx={{
         borderRadius: 'default',
         flexWrap: 'wrap',
         width: [120, 180]
       }}>
        {chunk.map(year => (
          <Cell key={`s+${year}`} cols={[2]}
            onClick={() => action(year)}
            select={year === date.getFullYear()}
          >{year}</Cell>
        ))}
      </Flex>
      <Box color='text' p={3} sx={{ cursor: 'pointer' }}
        onClick={() => { setChunk(range.nextChunk()) }}
      >-&gt;</Box>
    </Shadow>
  )
}
