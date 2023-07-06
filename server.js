const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const bcrypt = require('bcrypt')
const articleRouter = require('./routes/articles')
const loginRouter = require('./routes/articles')
const methodOverride = require('method-override')
// const fileUpload= require('express-fileupload')
var bodyParser = require('body-parser');
// const multer= require('multer')
const path= require('path')
var fs = require('fs');
const app = express()
const uploadModel=require('./models/upload')
require('dotenv/config');
var jwt = require('jsonwebtoken');

var empModel = require('./models/employee');



const DB=process.env.DATABASE;
const connectionParams={
	useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}
mongoose.createConnection(DB, connectionParams).then(()=>{
	console.log("connected")
}).catch((err)=>console.log(err))


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.use('/public', express.static('public'));



app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  // res.render('articles/index-articles', { articles: articles })
  res.render('articles/index', { articles: articles })
})
app.get('/articles', async (req, res) => {
	const articles = await Article.find().sort({ createdAt: 'desc' })
	res.render('articles/index-articles', { articles: articles})
	
  
})



app.use('/articles', articleRouter)
app.use('/', loginRouter)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))







var port = process.env.PORT || '3000'
app.listen(port, err => {
	if (err)
		throw err
	console.log('Server listening on port', port)
})
