if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


const express = require('express')
const Article = require('./../models/article')
const passport = require('passport')
const bcrypt= require('bcrypt')
const methodOverride = require('method-override')
const flash = require('express-flash')
const session = require('express-session')
const initializePassport = require('./../passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

const router = express.Router()
var multer= require('multer')
var path= require('path')

router.get('/new', (req, res) => {
  res.render('articles/new', { article: new Article() })
})


//FOR LOGIN AND REGISTER
router.use(flash())
router.use(session({
  secret: "this is a secret",
  resave: false,
  saveUninitialized: false
}))
router.use(passport.initialize())
router.use(passport.session())
router.use(methodOverride('_method'))

const users=[] //make a db, this is temporary
router.get('/login', checkNotAuthenticated,(req, res) => {
  res.render('articles/login')
})
router.get('/logout', checkAuthenticated,(req, res) => {
  res.render('articles/logout')
})
router.get('/register', checkNotAuthenticated,(req, res) => {
  res.render('articles/register')
})



router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/logout',
  failureRedirect: '/login',
  failureFlash: true
}))
router.post('/register', checkNotAuthenticated, async(req,res)=>{
  try{
    const hashedPassword = await bcrypt.hash(req.body.password,10)
    users.push({
      id: Date.now().toString(), //not needed if db present
      email:req.body.email,
      password: hashedPassword
    })
    res.redirect('login')
  }
  catch{
    res.redirect('register')
  }
  console.log(users)
})
router.delete('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login')
  });
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/logout')
  }
  next()
}
//ending of login and register

router.get('/edit/:id', async (req, res) => {
  const article = await Article.findById(req.params.id)
  res.render('articles/edit', { article: article })
})

router.get('/:slug', async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug })
  if (article == null) res.redirect('/')
  res.render('articles/show', { article: article })
})












  



  
router.post('/', async (req, res, next) => {
  req.article = new Article()
  next()
}, saveArticleAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
  req.article = await Article.findById(req.params.id)
  next()
}, saveArticleAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/articles')
})

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article
    article.image=req.body.image
    article.title = req.body.title
    article.description = req.body.description
    article.markdown = req.body.markdown

    try {
      article = await article.save()
      res.redirect(`/articles/${article.slug}`)
    } catch (e) {
      res.render(`articles/${path}`, { article: article })
    }
  }
}

module.exports = router