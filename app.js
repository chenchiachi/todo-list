const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('This is todo-list project.')
})

app.listen(port, () => {
  console.log(`The express server is runnung on http://localhost:${port}`)
})