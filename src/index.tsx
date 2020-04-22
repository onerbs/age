import React, { StrictMode } from 'react'
import { render } from 'react-dom'

import { ThemeProvider } from 'theme-ui'
import theme from './lib/theme.json'

import { Provider } from './lib/context'
import App from './App'

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
