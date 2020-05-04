import React, { createContext, useEffect, useState } from "react"
import lingua, { Lingua } from "./lingua"
import { compare } from "./age"

type context = {
  behind: boolean
  date: Date
  lang: Lingua
  prep: string
  timeDiff: number
  setDate(date: Date): void
  setLang(id: string): void
}

const def: context = {
  behind: false,
  date: new Date(new Date().getFullYear(), 0),
  lang: lingua(),
  prep: "",
  timeDiff: 0,
  setDate: (date: Date) => { console.log(date) },
  setLang: (id: string) => { console.log(id) },
}

export const Context = createContext<context>(def)
export const Provider = ({children}: { children: any }) => {
  const [date, setDate] = useState(def.date)
  const [now, setNow] = useState(new Date())
  const [behind, setBehind] = useState(date.getTime() > now.getTime())
  const [diff, setDiff] = useState(compare(now, date))
  const [lang, setLang] = useState(def.lang)
  const [prep, setPrep] = useState(behind ? lang.age.to : lang.age.since)

  useEffect(() => {
    setBehind(date.getTime() > now.getTime())
    setDiff(compare(now, date))
    setPrep(behind ? lang.age.to : lang.age.since)
  }, [now])

  useEffect(() => {
    setInterval(() => {
      setNow(new Date())
    }, 1000)
  }, [])

  return <Context.Provider value={{
    date, behind, lang, setDate, prep, timeDiff: diff,
    setLang: (id: string) => setLang(lingua(id))
  }} children={children}/>
}
