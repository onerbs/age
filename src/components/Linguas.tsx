import React, { useContext } from 'react'
import { Context } from '../lib/context'
import { linguas } from '../lib/lingua'
import { Box } from 'theme-ui'

export default () => {
  const { setLang } = useContext(Context)
  return (
    <Box sx={{
      position: 'absolute',
      right: '20pt',
      top: '20pt'
      }}>
      {linguas.map(lingua =>
        <Box mb={3} sx={{
          cursor: 'pointer',
          opacity: 0.4,
          '&:hover': {
            opacity: 0.8
          }}}
          onClick={() => { setLang(lingua.id) }}>{lingua.name}</Box>
      )}
    </Box>
  )
}
