import React, { StrictMode } from 'react'
import { render } from 'react-dom'
import { ThemeProvider } from 'theme-ui'
import App from './App'
import { Provider } from './lib/context'

render (
  <ThemeProvider theme={{
    breakpoints: ["360px", "480px", "800px", "1024px"],
    colors: {
      text: "#ddd",
      background: "#000",
      shadow: "#000A",
    },
    radii: { default: "3px", plus: "5px" },
    fontSizes: [ "2rem", "2.65rem", "3.35rem", "4rem", "1rem", "1.25rem", "1.55rem" ]
  }}>
    <StrictMode>
      <Provider>
        <App/>
      </Provider>
    </StrictMode>
  </ThemeProvider>
  ,
  document.getElementById('root')
)
