const express = require('express');
const app = express();
const port = 3000;

const users = [
    {id: 1, email: 'user1@example.com', password: 'password1' },
    {id: 2, email: 'user2@example.com', password: 'password2' },
    {id: 3, email: 'user3@example.com', password: 'password3' },
    {id: 4, email: 'user4@example.com', password: 'password4' }
];

app.get('/', (req, res) => {
    res.send('Hello World');
});



app.get('/users', (req, res) => {
    res.send(users);
});

app.get('/users/:id', (req, res) => {
    res.send(users.filter(user => user.id === req.params.id)[0]);
});

app.post('/users', (req, res) => {
    const Nuser = req.body
    console.log(Nuser);
    res.send("you are amazing!!");
});


app.listen(port, () => {
    console.log(`Server is up and running on port:${port}`);
});