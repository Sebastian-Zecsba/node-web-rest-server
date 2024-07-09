import fs from 'fs'
import hppt2 from 'http2'


const server = hppt2.createSecureServer({
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt'),
},(req, res) => {

    console.log(req.url)

    // res.writeHead(200, {'Content-Type' : 'text/html'})
    // res.write('<h1>Hola mundo!</h1>')
    // res.end()

    // const data = {name: 'Jhon Doe', age: 30, city: 'New York'};
    // res.writeHead(200, { 'Content-Type' : 'aplication/json' })
    // res.end(JSON.stringify(data))

    if(req.url === '/'){
        const htmlFyle = fs.readFileSync('./public/index.html', 'utf-8')
        res.writeHead(200, {'Content-Type' : 'text/html'})
        res.end(htmlFyle)

        return;
    }

    if(req.url?.includes('.js')){
        res.writeHead(200, {'Content-Type' : 'application/javascript'})
    } else if(req.url?.includes('.css')) {
        res.writeHead(200, {'Content-Type' : 'text/css'})
    }

    const responseContent = fs.readFileSync(`./public/${req.url}`, 'utf-8')
    res.end(responseContent);


})


server.listen(8080, () => {
    console.log('Server running on port 8080')
})