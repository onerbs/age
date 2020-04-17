const express = require('express')
const server = express()
const PORT = 4873

server.use(express.static(__dirname + '/public'))

server.get('/', (_, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

server.listen(PORT, () => {
  console.log(`  > live at http://localhost:${PORT}/`)
})
