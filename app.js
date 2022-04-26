require ('dotenv').config();
const connect = require('./configs/db.config');
connect();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use(require('./middleware/auth.middleware'));

app.use('/auth', require('./routes/auth.routes'));

app.use('/products', require('./routes/product.routes'))

app.use('/comments', require('./routes/comment.routes'))

app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT: ${process.env.PORT}`)
})