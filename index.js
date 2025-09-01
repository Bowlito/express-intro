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

app.route(['/home', '/accueil'])
    .get((req, res) => {
        console.log(`GET : ${req.url}`)
        //res.end(`GET : ${req.url}`)
        res
            .type('html')
            .sendFile(import.meta.dirname + '/index.html')
    })
    .post((req, res) => {
        console.log(`POST : ${req.url}`)
        res.end(`POST : ${req.url}`)
    })

app.all('/personne', (req, res) => {
    console.log(`${req.method} : ${req.url}`)
    res.end(`${req.method} : ${req.url}`)
})

app.get('/adresse', (req, res) => {
    res.end(`Ici c'est ${req.query['ville']} - ${req.query.cp}`)
})

app.get('/adresse/:ville/:cp', (req, res) => {
    res.end(`Ici c'est ${req.params['ville']} - ${req.params.cp}`)
})

// app.get('/calcul/:operateur', (req, res) => {

//     let calcul

//     if (req.params['operateur'] == 'plus') {
//         calcul = Number(req.query['a']) + Number(req.query['b']);
//     } else if(req.params['operateur'] == 'moins'){
//         calcul = Number(req.query['a']) - Number(req.query['b']);
//     } else if(req.params['operateur'] == 'fois'){
//         calcul = Number(req.query['a']) - Number(req.query['b']);
//     } else if(req.params['operateur'] == 'div'){
//         calcul = Number(req.query['a']) / Number(req.query['b']);
//     }

//     res.end(`${req.query['a']} ${req.params['operateur']} ${req.query['b']} = ${calcul}`)
// })

// Solution Achref
// app.get('/calcul/:op', (req, res) => {
//     const { a, b } = req.query
//     switch (req.params.op) {
//         case 'plus': res.end(`${a} + ${b} = ${Number(a) + Number(b)}`); break;
//         case 'moins': res.end(`${a} - ${b} = ${Number(a) - Number(b)}`); break;
//         case 'fois': res.end(`${a} * ${b} = ${Number(a) * Number(b)}`); break;
//         case 'div': res.end(`${a} / ${b} = ${Number(a) / Number(b)}`); break;
//         default: res.end(`L'opérateur ${req.params.op} est inconnu`)
//     }
// })


app.get('/calcul/:operateur', (req, res) => {

    let calcul

    switch (req.params['operateur']) {
        case "plus":
            calcul = Number(req.query['a']) + Number(req.query['b']);
            break;

        case "moins":
            calcul = Number(req.query['a']) - Number(req.query['b']);
            break;

        case "fois":
            calcul = Number(req.query['a']) * Number(req.query['b']);
            break;

        case "div":
            if (req.query['b'] == 0) {
                calcul = 'Impossible de diviser par 0'
                break;
            }
            calcul = Number(req.query['a']) / Number(req.query['b']);
            break;

        default:
            break;
    }

    res.end(`${req.query['a']} ${req.params['operateur']} ${req.query['b']} = ${calcul}`)
})





// app.get(['/home', '/accueil'], (req, res) => {
//     console.log(`GET : ${req.url}`)
//     res.end(`GET : ${req.url}`)
// })

// app.post(['/home', '/accueil'], (req, res) => {
//     console.log(`POST : ${req.url}`)
//     res.end(`POST : ${req.url}`)
// })

// Middleware pour les routes restantes : à placer en dernier
app.get('/*splat', (req, res, next) => {
    console.log("GET : La route demandée n'existe pas")
    res
        .status(404)
        .json({ "Erreur": "La page demandée n'existe pas" })
    // res
    //     .sendStatus(404)
    //res
    // .status(404)
    // .end("GET : La route demandée n'existe pas")

})




const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Adresse serveur : http://localhost:${PORT}`);

})