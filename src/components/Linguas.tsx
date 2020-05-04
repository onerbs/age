import React, { useContext } from 'react'
import { Context } from '../lib/context'
import { linguas } from '../lib/lingua'
import { Box } from 'theme-ui'

export default function Linguas() {
  const { setLang } = useContext(Context)
  return (
    <Box sx={{
      position: 'absolute',
      right: '20pt',
      top: '20pt'
    }}>
      {linguas.map(lingua =>
        <Box mb={3} onClick={() => { setLang(lingua.id) }} sx={{
          cursor: 'pointer',
          fontFamily: 'text',
          opacity: 0.4,
          '&:hover': {
            opacity: 0.8
          }
        }}>{lingua.name}</Box>
      )}
    </Box>
  )
}
