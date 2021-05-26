const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 4400
require('dotenv').config()

let db, 
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'Quotes'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.get('/', async (req,res)=> {
    const quoteItems = await db.collection('quotes').find().toArray()
    const quoteLikes = await db.collection('quotes').countDocuments({ liked: true})
    res.render('index.ejs', {info: quoteItems, totalLikes: quoteLikes})
})

app.post('/addQuote', (req, res)=>{
    db.collection('quotes').insertOne({quote: req.body.quoteItem, author: req.body.authorItem, liked: false})
    .then(result=>{
        console.log(`Quote has been added.`)
        res.redirect('/')
    })
})

app.delete('/delQuote', (req, res)=>{
    db.collection('quotes').deleteOne({quote:req.body.erasers.trim()}) 
    .then(result=>{
        console.log('Quote has been removed.')
        res.json('Deleted it')
    })
    .catch(err=> console.log(err))
})

app.put('/likeQuote', (req, res)=> {
    db.collection('quotes').updateOne({quote: req.body.likers}, {
        $set: {
            liked: true
        }
    })
    .then(result=> {
        console.log('Quote has been liked.')
        res.json('Quote has been liked.')
    })
    .catch(err=> console.log(err))
})

app.put('/unlikeQuote', (req, res)=> {
    db.collection('quotes').updateOne({quote: req.body.likers}, {
        $set: {
            liked: false
        }
    })
    .then(result=> {
        console.log('Quote has been liked.')
        res.json('Quote has been liked.')
    })
    .catch(err=> console.log(err))
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}.`)
})