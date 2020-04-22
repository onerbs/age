import React, { StrictMode } from 'react'
import { render } from 'react-dom'
import { ThemeProvider } from 'theme-ui'
import App from './App'
import { Provider } from './lib/context'

render (
  <ThemeProvider theme={theme}>
    <StrictMode>
      <Provider>
        <App/>
      </Provider>
    </StrictMode>
  </ThemeProvider>
  ,
  document.getElementById('root')
)
