import React, { createContext, useState } from "react"
import lingua, { Lingua } from "./lingua"

interface context {
  now: Date
  date: Date
  lang: Lingua
  setDate: (date: Date) => void
  setLang: (id: string) => void
}

const def: context = {
  now: new Date(),
  date: new Date(),
  lang: lingua(),
  setDate: (date: Date) => { console.log(date) },
  setLang: (id: string) => { console.log(id) },
}

export const Context = createContext<context>(def)
export const Provider = ({children}: { children: any }) => {
  const [date, setDate] = useState(def.date)
  const [lang, setLang] = useState(def.lang)

  return <Context.Provider value={{
    now: def.now, date, lang, setDate, setLang: (id: string) => setLang(lingua(id))
  }} children={children}/>
}
