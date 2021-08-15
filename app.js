const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('Body-Parser')

const Todo = require('./models/todo')
const todo = require('./models/todo')

const app = express()
const port = 3000

mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection // 取得資料庫連線狀態
db.on('error', () => {
  console.log('mongodb error!') // 連線異常
})
db.once('open', () => {
  console.log('mongodb connected!') // 連線成功
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  Todo.find() // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(todos => res.render('index', { todos })) // 將資料傳給 index 樣板
    .catch(error => console.error(error))
})

app.get('/todos/new', (req, res) => {
   return res.render('new')
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('detail',{ todo }))
    .catch(error => console.log(error))
})

app.post('/todos', (req, res) => {
  const name = req.body.name
  return Todo.create({ name }) // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
  .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`The express server is running on http://localhost:${port}`)
})