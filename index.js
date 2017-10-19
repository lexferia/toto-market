const bodyParser = require('body-parser');
const path = require('path')
const express = require('express')
const routes = require('./routes')

const PORT = 7000

let app = express()

app.use(express.static(path.join(process.cwd(), 'public')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', routes)

app.listen(PORT, () => {
  console.log(`app started http://localhost:${PORT}`)
})
