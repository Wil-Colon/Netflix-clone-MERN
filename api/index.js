const express = require('express');
const app = express();
const port = 8800;
const db = require('./db');

app.use(express.json());

db();

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/movies', require('./routes/movies'));
app.use('/api/lists', require('./routes/lists'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
