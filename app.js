const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');

// fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) =>{
// 	const productData = JSON.parse(data);
// 	//res.writeHead(200, {'Content-type': 'application/json'});
// 	//console.log(productData);
// 	//res.end(data);
// })

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
	console.log(req.url);
	const pathName = req.url;
	
	//Overview page:
	if(pathName === '/' || pathName === '/overview') {
		res.writeHead(200, {
			'Content-type': 'text/html'
		  });

		const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
		//console.log(cardsHtml);
		const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
		res.end(output)
	
		//Product page:
	} else if (pathName === '/product') {
		res.end('This is the product page')
	
	//Api:
	} else if (pathName === '/api') {
         res.writeHead(200, {'Content-type': 'application/json'});
	     res.end(data);
    
    //Not found:
	}else {
		res.writeHead(404, {
			'Content-type': 'text/html',
			'my-own-header': 'hello-world'
		});
		res.end('<h1>Page not found!!!</h1>')
	}
 
});


server.listen(3000, '127.0.0.1', () => {
	console.log('Listening to requests on port 3000');
  })