import React, { createContext, useEffect, useState } from "react"
import lingua, { Lingua } from "./lingua"
import { compare } from "./age"

type context = {
  lang: Lingua
  date: Date
  behind: boolean
  prep: string
  timeDiff: number
  setLang: (id: string) => void
  setDate: (date: Date) => void
}

const def: context = {
  lang: lingua('es'),
  date: new Date(new Date().getFullYear(), 0),
  behind: false,
  prep: "",
  timeDiff: 0,
  setLang: (id: string) => { console.log(id) },
  setDate: (date: Date) => { console.log(date) },
}

export const Context = createContext<context>(def)
export const Provider = ({children}: { children: any }) => {
  const [lang, setLang] = useState(def.lang)
  const [date, setDate] = useState(def.date)
  const [now, setNow] = useState(new Date())
  const [behind, setBehind] = useState(date.getTime() > now.getTime())
  const [prep, setPrep] = useState(behind ? lang.age.to : lang.age.since)
  const [diff, setDiff] = useState(compare(now, date))

  useEffect(() => {
    setBehind(date.getTime() > now.getTime())
    setPrep(behind ? lang.age.to : lang.age.since)
    setDiff(compare(now, date))
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
