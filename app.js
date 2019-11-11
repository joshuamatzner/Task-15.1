const express = require('express');
const app = express();
const fileHandler = require('fs');

app.use(express.static('public'));


app.get('/', function(req, res) {
  fileHandler.readFile('person.json', (err, data) => {
      if (err) res.send('File not found. First post to create file.');
      else
          res.send(`Welcome ${data}`);
  })
});

//app.get('/about',function(req,res) {
//  res.sendFile('about.html');
//});

app.use(function(err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;

  if (err.shouldRedirect) {
    res.render('myErrorPage') 
  } else {
    res.status(err.statusCode).send(err.message); 
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
