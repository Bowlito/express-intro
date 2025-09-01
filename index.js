import { createServer } from 'node:http';
import 'dotenv/config'

const server = createServer((req, res) => {
    res.end("Hello world!")
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`Adresse serveur : http://localhost:${PORT}`);

})