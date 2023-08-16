const { error } = require('console');
const express = require('express');
const app = express();
const port = 3000;
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const users = [
    { id: uuidv4(), email: 'user1@example.com', password: 'password1' },
    { id: uuidv4(), email: 'user2@example.com', password: 'password2' },
    { id: uuidv4(), email: 'user3@example.com', password: 'password3' },
    { id: uuidv4(), email: 'user4@example.com', password: 'password4' }
];

app.listen(port, () => {
    console.log(`Server is up and running on port:${port}`);
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/users', (req, res) => {
    res.send(users);
});

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    res.send(users.filter(user => user.id === id)[0]);
});


app.post('/users', (req, res) => {
    const pass = req.body.password
    users[users.length] = {
        id: uuidv4(),
        email: req.body.email,
        password: bcrypt.hash(pass, saltRounds)
    }
    console.log(users);
    res.send("sucsess!!");
});

app.put('/users/:id', (req, res) => {
    const idParam = +req.params.id;
    const edit = req.body;
    for (let user of users) {
        if (user.id === idParam) {
            if (req.body.email) user.email = edit.email;
            if (req.body.password) user.password = edit.password;
        }
    }
    res.send('sucsses!')
    console.log(users);
})

app.delete('/users/:id', (req, res) => {
    const idParam = +req.params.id;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === idParam) {
            users.splice(i, 1);
            res.send(`delete user ${idParam}`);
        } else {
            res.send('Id Not found');
        }
    }
    console.log(users);
});

app.post('/users/verify', (req, res) => {
    const mail = req.body.email;
    const pass = req.body.password;
    bcrypt.hash(pass, saltRounds (err, hash) => {
        console.log(bcrypt.hash);
    });
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === mail) {
            bcrypt.compare(pass, users[i].password, (err, result) => {
                if (err) throw error;
                result ? res.send('User connected') : res.send('wrong password')
            })
        }
    }
    res.send('mail not found')
})