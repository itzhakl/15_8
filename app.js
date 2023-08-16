const { error } = require('console');
const express = require('express');
const app = express();
const port = 3000;
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { send } = require('process');
const saltRounds = 10;

async function hashPassword(password) {
    try {
        const saltRounds = 10; // Number of salt rounds for the bcrypt algorithm
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
}

async function comparePasswords(enteredPassword, hashedPassword) {
    try {
        const match = await bcrypt.compare(enteredPassword, hashedPassword);
        return match;
    } catch (error) {
        throw error;
    }
}

const users = [
    { id: '1', email: 'user1@example.com', password: 'password1' },
    { id: '2', email: 'user2@example.com', password: 'password2' },
    { id: '3', email: 'user3@example.com', password: 'password3' },
    { id: '4', email: 'user4@example.com', password: 'password4' }
];

for (let user of users) {
    user.id = bcrypt.hash(user.id, saltRounds).then(result => console.log(result));
};

console.log(users);

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


app.post('/users', async (req, res) => {
    const pass = req.body.password;
    users[users.length] = {
        id: uuidv4(),
        email: req.body.email,
        password: await hashPassword(pass)
    }
    console.log(users);
    res.send("sucsess!!");
});

app.put('/users/:id', (req, res) => {
    const idParam = +req.params.id;
    const { email, password } = req.body;
    for (let user of users) {
        if (user.id === idParam) {
            if (email) user.email = email;
            if (password) user.password = password;
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

app.post('/users/verify', async (req, res) => {
    const mail = req.body.email;
    const pass = req.body.password;
    // bcrypt.hash(pass, saltRounds, (err, hash) => {
    //     console.log(hash);
    // });
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === mail) {
            console.log(users[i]);
            if (await comparePasswords(pass, users[i].password))
            // .catch(err => new Error(err));
            // bcrypt.compare(pass, users[i].password, (err, result) => {
            //     if (err) throw error;
            //     result ? res.send('User connected') : res.send('wrong password')
            // })
        }
    }
    // res.send('mail not found')
});