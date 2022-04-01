const fs = require('fs');
const http = require('http');
const url = require('url');

// fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) =>{
// 	const productData = JSON.parse(data);
// 	//res.writeHead(200, {'Content-type': 'application/json'});
// 	//console.log(productData);
// 	//res.end(data);
// })
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
	console.log(req.url);
	const pathName = req.url;
	
	if(pathName === '/' || pathName === '/overview') {
		res.end('This is the Overview page!!')
	
	} else if (pathName === '/product') {
		res.end('This is the product page')
	
	} else if (pathName === '/api') {
         res.writeHead(200, {'Content-type': 'application/json'});
	     res.end(data);
        
	}else {
		res.writeHead(404, {
			'Content-type': 'text/html',
			'my-own-header': 'hello-world'
		});
		res.end('<h1>Page not found!!!</h1>')
	}
 
});


server.listen(3000, '127.0.0.1', () => {
	console.log('Listening to requests on port 8000');
  })