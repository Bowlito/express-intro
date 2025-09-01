import express from 'express'

import 'dotenv/config'

const app = express()

const m1 = (req, res, next) => {
    console.log("Middleware : m1");
    next()
    
}

const m2 = (req, res, next) => {
    console.log("Middleware : m2");
    next()
}

const m3 = (req, res, next) => {
    console.log("Middleware : m3");
    next()
}

app.get('/', (req, res, next) => {
    console.log("GET : /")
    res.end("GET : /")
    next()
})



app.use([m1,m3,m2])

//app.use(m1)

//app.use(m2)



const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Adresse serveur : http://localhost:${PORT}`);

})