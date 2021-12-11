require('dotenv').config();
const router = require('./src/routes/index');
const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

const cors = require('cors')

app.use(cors({}))
app.use('/api/v1/', router);

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'))

app.listen(port,() => console.log(`server running at port: ${port}`))
