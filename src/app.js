const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname)  --gives path to the current directory
//console.log(path.join(__dirname, '../public')) -- gives path to the public directory

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlbars engine and views location
app.set('view engine', 'hbs')   //to set handlebars for creating dynamic templates
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)      //takes a path to the directory

//Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rashmi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Rashmi'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Rashmi'
    })
})
// app.get('', (req, res) => {
//     res.send('<h1>Hello express!</h1> ')
// })


// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Rashmi',
//         age: 23
//     }, {
//         name: 'sarah',
        
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About page!</h1> ')
// })

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location } = {}) => {   //setting default parameter ={}
        if(error){
            return res.send({ error }) //using shortHand (error: error)
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error }) //using shortHand (error: error)
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Mumbai',
    //     address: req.query.address
    // })
})

app.get('/help/*', (req, res) => {
   //res.send('Help article not found!')
   res.render('404', {
    title: '404',
    name: 'Rashmi',
    errorMessage: 'Help article not found!'
   })
})

app.get('*', (req, res) => {
   // res.send('My 404 Page!')
   res.render('404', {
       title: '404',
       name: 'Rashmi',
       errorMessage: 'Page not found!'
        
   })
})
//app.com
//app.com/help
//app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})