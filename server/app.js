const createError = require('http-errors')
const express = require('express')
const logger = require('morgan')
const compression = require('compression')

const app = express()
app.use(compression())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Router Initialization
app.get('/health', (req, res) => {
    res.status(200).json({
        messsge: 'Musings Server is running healthy!'
    })
})


// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404))
})

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app