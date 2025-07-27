const fs = require('fs');
const http = require('http');
const url = require('url');

// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;

// fs.writeFileSync('./txt/output.txt', textOut);

// Assincronous file reading
// fs.readFile('./txt/input.txt', 'utf-8', (err, data) => {
//     if (err) return 

//     fs.readFile(`./txt/${data}.txt`, 'utf-8', (err, data2) => {
//         conseol.log(data2);

//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//             console.log(data3);

//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log('Your file has been written');
//             });
//         })
//     })
// });

///////////////////////////
// Server

const server = http.createServer((req, res) => {
    const pathname = req.url;

    if(pathname === '/' || pathname === '/overview') {
        res.end('this is Overview');
    } else if(pathname === '/product') {
        res.end('this is Product');
    } else if(pathname === '/api') {

        fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, {
                    'Content-type': 'application/json'
                });
                res.end(JSON.stringify({ message: 'Error reading file' }));
            } else {
                res.writeHead(200, {
                    'Content-type': 'application/json'
                });
                res.end(data);
            }
        });
    }

    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not found</h1>');
    }

})

server.listen(8000, '127.0.0.1', () => {
    console.log('Server is listening on port 8000');
});