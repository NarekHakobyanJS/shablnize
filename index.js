const express = require('express')
const app = express()
const path = require('path')
const port = 3003

const createPath = (fileName) => path.join(__dirname, 'view', `${fileName}.ejs`)

app.set('view engine', 'ejs')
app.use(express.static('style'))
app.use(express.urlencoded({extended : false}))
app.get('/', (req, res) => {
    res.render(createPath('index'))
})

app.get('/contacts', (req, res) => {
    const contacts = ["tel", 'email', 'social']
    res.render(createPath('contacts'), {contacts})
})

app.get('/posts/:id', (req, res) => {
    const post = {
        id : "1",
        text : "lorem",
        title : "lorem 1",
        date : "09.09.09",
        author : 'hndik'
    }

    const {id, title, text, date, author} = post
    res.render(createPath('post'), {id, title, text, date, author})
})

app.get('/posts', (req, res) => {
    const posts = [
        {
            id : "1",
            text : "lorem",
            title : "lorem 1",
            date : "09.09.09",
            author : 'hndik'
        },
        {
            id : "2",
            text : "two",
            title : "vay qu ara",
            date : "09.09.29",
            author : 'hndik qaqi gndik'
        }
    ]
    res.render(createPath('posts'), {posts})
})

app.post('/add-post', (req, res) => {
   console.log(req.body);
   const {title, text, author} = req.body
   const post = {
    id : new Date(),
    date : (new Date()).toLocaleDateString(),
    title,
     text,
     author
   }
   res.render(createPath('post'), {title, text, author, date : post.date})
    
})
app.get('/add-post', (req, res) => {
    res.render(createPath('add-post'))
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})