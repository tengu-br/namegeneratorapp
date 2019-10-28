const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { namefy, namefyInfo } = require('./utils/namefy')

const app = express()
const port = process.env.PORT || 3000

const viewsPath = path.join(__dirname, '../templates/views')
const publicPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', '')
})


app.get('/generate', async (req, res) => {
    const name = await namefy(parseInt(req.query.flair))
    return res.send({
        name
    })
})

app.get('/info', async (req, res) => {
    const info = await namefyInfo(parseInt(req.query.flair))
    return res.send({
        info
    })
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'No such page'
    })
})

app.listen(port, () => {
    console.log('server\'s fired up')
})