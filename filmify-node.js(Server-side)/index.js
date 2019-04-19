require('custom-env').env()
const express = require('express');
const bodyParser = require('body-parser');
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
const app = express();
const apiRouter = require('./api/routes/api-routes');
const path = require('path');
const port = process.env.PORT || 3030;

const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`;

mongoose.connect(uri, { useNewUrlParser: true }).then(
  () => {
    console.log('DB connected')
  }
);

const directory = path.join(__dirname, '/uploads');
app.use('/uploads', express.static(directory));

app.use(bodyParser.json({ limit: '50mb' }));

app.use(bodyParser.text({ type: 'text/plain', limit: '50mb' }));

app.use('/api', apiRouter);

app.get('/', (req, res) => res.json('Filmify server side app works!'));

const server = app.listen(port, () => console.log('Server is running on port ' + port)); //eslint-disable-line

module.exports = app;
