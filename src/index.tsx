import React, { StrictMode } from 'react'
import { render } from 'react-dom'
import { ThemeProvider } from 'theme-ui'
import App from './App'

render (
  <ThemeProvider theme={{
    breakpoints: ["360px", "480px", "800px", "1024px"],
    colors: { text: "#ddd", background: "#000" },
    fontSizes: [ "2rem", "2.65rem", "3.35rem" ]
  }}>
    <StrictMode>
      <App/>
    </StrictMode>
  </ThemeProvider>
  ,
  document.getElementById('root')
)
