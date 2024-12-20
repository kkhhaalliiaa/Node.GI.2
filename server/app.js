const path = require('path')
const express = require('express')
const hbs = require('hbs')
const movie = require('./utils/movie')
const recommend = require('./utils/recommend')
const PORT = process.env.PORT || 3000;

const app = express()


const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))
app.use(express.static('public'));

app.get('/', (req, res)=>{ 

    res.render('index', {
        title: 'Movie App',
        name:'Khalia Howard'
        })
})

app.get('/search', (req,res)=>{
    const movieName = req.query.movie

    if (!movieName){
        return res.send({
        error:'You must provide a search term'
        })
    }

    movie(movieName).then(movie => {
        recommend(movie.id).then(movieList => {
            return res.send({
                movie: movie,
                recommedations: movieList
            })
        })
    })
})

app.get('*',(req,res)=> {
    res.render('404',{
        title:'404',
        name:'Khalia Howard',
        errorMessage:'Page not found' 
    })
})

app.listen(PORT, ()=>{
    console.log('server on port 3000')
})

