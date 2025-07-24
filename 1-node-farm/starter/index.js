const fs = require('fs');
const http = require('http');

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
    console.log(req);
    res.end('Hello from the server!');
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Server is listening on port 8000');
});