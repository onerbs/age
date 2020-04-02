const express = require('express')
const server = express()
const PORT = 4873

server.use(express.static(__dirname + '/docs'))

server.get('/', (_, res) => {
  res.sendFile(__dirname + '/docs/index.html')
})

server.listen(PORT, () => {
  console.log(`  > live at http://localhost:${PORT}/`)
})
