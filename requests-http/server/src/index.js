const express = require('express');
const cors = require('cors'); //o cors é para conseguir fazer 2 localhost se comunicarem
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


const multipartMiddleware = multipart({ uploadDir: './uploads' });

app.post('/upload', multipartMiddleware, (req, res) => {
  const files = req.files;
  res.json({ message: files })
})

app.use((erro, req, res, next) => res.json({ err: erro.message}))
app.listen(8000, ()=> {
  console.log("Server is running on port 8000");
})


//
