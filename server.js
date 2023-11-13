const express = require('express')
const app = express();
const PORT = process.env.PORT || 3500;
const path = require('path')
const accepts = require('accepts')
const { logger } = require('./middleware/logger')
const  errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors');
 const corsOptions = require('./config/corsOptions')
app.use(logger)

app.use(cors(corsOptions));

// adding middleware: ability to use json
app.use(express.json())

app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, 'public')))
// or like that:
// app.use(express.static('public'))

app.use('/', require('./routes/root'))

// 404 page:
app.all('*', (req, res) => {
    res.status(404)
    if(req, accepts('html') ) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))

    }else if (req.accepts('json')) {
        res.json({ message: "404  Not Found'"})
    }else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler) 


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

