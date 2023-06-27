const express = require('express');
const app = express();
const port = process.env.PORT || 10000;
const db = require('./db');
const path = require('path');
const cors = require('cors');

app.use(cors({
    origin: '*'
}));

app.use(express.json());

db();

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/movies', require('./routes/movies'));
app.use('/api/lists', require('./routes/lists'));

app.use(express.static('client/build'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
