import express from 'express'
import path from 'path'

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(4000)

console.log('Server running on http://localhost:4000')
