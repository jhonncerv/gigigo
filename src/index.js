const express = require('express')
const app = express()
const usersRoute = require('./routes/user')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/users', usersRoute)

app.use(express.static('public'))
app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message:error.message
        }
    })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.info(`Server has estarted at ${PORT}`))