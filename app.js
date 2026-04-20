const express = require('express');
const app = express();

app.use(express.json());

let users = [];

app.get('/', (req, res) => {
    res.send('App is running');
});

app.post('/login', (req, res) => {
    res.json({ message: "Login successful" });
});

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).json(user);
});

module.exports = app;

if (require.main === module) {
    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
}