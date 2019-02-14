const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3500;

app.locals.pretty = true;
app.use('/', express.static('public'));
app.use('/assets', express.static('assets'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('view engine', 'pug');
app.set('views', './views');

app.get('/book', getQuery);
app.get('/book/:id', getQuery);
app.get('/book/:id/:mode', getQuery);
app.post('/book/create', postQuery);

function postQuery(req, res) {
  var title = req.body.title;
  var content = req.body.content;
  res.send(title + " / " + content);
}

function getQuery(req, res) {
  var params = req.params;
  var datas = null;
  fs.readFile('./data/nav.json', 'utf-8', function(err, data){
    if(err) res.status(500).send("Internal Server Error");
    datas = JSON.parse(data);
    var pugData = {pages: datas.books};
    if(typeof params.id !== 'undefined') {
      if(params.id == 'new') {
        pugData.title = "신규 글 등록";
        res.render('wr', pugData);
      }
      else {
        pugData.title = "도서목록";
        res.render('li', pugData);
      }
    }
    else {
      res.send('');
    }
  });
}

/*
app.get('/page', (req, res) => {
  console.log(req.query);
  var id = req.query.id;
  var pageTits = ["MAIN", "PAGE1", "PAGE2", "PAGE3"];
  var html = `
  <ul>
    <li style="padding:1rem;list-style:none;float:left;width:20%;">
      <a href="/page?id=0">Main</a></li>
    <li style="padding:1rem;list-style:none;float:left;width:20%;">
      <a href="/page?id=1">Page1</a></li>
    <li style="padding:1rem;list-style:none;float:left;width:20%;">
      <a href="/page?id=2">Page2</a></li>
    <li style="padding:1rem;list-style:none;float:left;width:20%;">
      <a href="/page?id=3">Page3</a></li>
    <li style="clear:both;list-style:none;"></li>
  </ul>
  <div style="text-align:center">
    <h1>${pageTits[id]}</h1>
  </div>`; 
  res.send(html);
});
*/
app.get('/info', (req, res) => {
  var now = new Date();
  var html = `
  <!DOCTYPE html>
  <html lang="ko">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Information</title>
  </head>
  <body>
    <h1>Information Page!!!!!!!!!</h1>
    <h2>${now}</h2>
  </body>
  </html>`;
  res.send(html);
});

//RESTful
//app.get('/', (req, res) => res.send('Hello World!~~~~~~~'));

app.listen(port, () => console.log(`http://localhost:${port}`));