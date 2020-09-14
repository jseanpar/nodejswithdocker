const http = require('http');
const server = http.createServer();

const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Viernes', 'Sabado', 'Domingo'];
const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
    'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

server.on('request', (req, res) => {

    if (req.method === 'POST' && req.url == "/birthday") {
        let body = [];
        req.on('data', chunk => {
            body.push(chunk);
        })
            .on('end', () => {
                res.writeHead(200, { 'Content-Type': 'text-plain' })
                body = Buffer.concat(body).toString().split('-');

                const year = body[2];
                const month = body[1] - 1;
                const day = body[0];

                const date = new Date(year, month, day);
                const dateFormat = `Naciste el día ${days[date.getDay()]} \n ${date.getDate()} de ${months[date.getMonth()]} del año ${date.getFullYear()}`;

                res.end(dateFormat);
            })
    } else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(8001);
console.log('Servidor en la url http://localhost:8001')