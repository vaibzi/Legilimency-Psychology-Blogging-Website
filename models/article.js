const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)




const articleSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  markdown: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  sanitizedHtml: {
    type: String,
    required: true
  }
})

articleSchema.pre('validate', function(next) {
  if (this.image) {
    this.slug = slugify(this.image,{  lower: true, strict: true })
  }
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true })
  }

  if (this.markdown) {
    this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
  }

  next()
})

const Article = mongoose.model('Article', articleSchema)
module.exports = Article;



