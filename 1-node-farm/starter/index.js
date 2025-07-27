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

// Carregamos esses arquivos antes do server pois eles são carregados apenas uma vez e não a cada requisição 
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');

const replaceCardsElements = (temp, el) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, el.productName);
    output = output.replace(/{%IMAGE%}/g, el.image);
    output = output.replace(/{%FROM%}/g, el.from);
    output = output.replace(/{%NUTRIENTS%}/g, el.nutrients);
    output = output.replace(/{%QUANTITY%}/g, el.quantity);
    output = output.replace(/{%PRICE%}/g, el.price);
    output = output.replace(/{%DESCRIPTION%}/g, el.description);
    output = output.replace(/{%ID%}/g, el.id);
    return output;
}

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathname = req.url;


    // Overview page
    if(pathname === '/' || pathname === '/overview') {
        const cardsHtml = dataObj.map(el => replaceCardsElements(tempCard, el)).join('');
        const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);

        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        res.end(output);

    // Product page
    } else if(pathname === '/product') {
        res.end('this is Product');

    // API
    } else if(pathname === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(data);
    }

    // Not found
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