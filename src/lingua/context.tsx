import React, { createContext, useState } from "react"
import lingua, { Lingua } from "."

interface context {
  lang: Lingua
  setLang: (id: string) => void
}

const def: context = {
  lang: lingua(),
  setLang: (id: string) => { console.log(id) },
}

export const LinguaContext = createContext<context>(def)
export const LinguaProvider = ({children}: { children: any }) => {
  const [lang, setLang] = useState(def.lang)
  return <LinguaContext.Provider value={{
    lang, setLang: (id: string) => setLang(lingua(id))
  }} children={children}/>
}
