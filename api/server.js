// BUILD YOUR SERVER HERE
const express = require('express');
const { find, findById, insert } = require('./users/model');
const server = express();

server.use(express.json());

server.get('/api/users', async (req, res) => {
    try {
        const allUsers = await find();
        res.status(200).send(allUsers);
    } catch (error) {
        res.status(500).json({
            Error: error.message,
            message: 'The users information could not be retrieved',
        });
    }
});

server.get('/api/users/:id', async (req, res) => {
    const id = req.params.id;
    const user = await findById(id);
    try {
        if (!user) {
            res
                .status(404)
                .json({ message: 'The user with the specified ID does not exist' });
        } else {
            res.status(200).send(user);
        }
    } catch (error) {
        res
            .status(500)
            .json({ message: 'The user information could not be retrieved' });
    }
});

server.post('/api/users', async (req, res) => {
    const newUser = req.body;
    const user = await insert(newUser);
    try {
        if (!user.bio || !user.name) {
            res
                .status(400)
                .json({ message: 'Please provide name and bio for the user' });
        } else {
            res.status(201).json(user);
        }
    } catch (error) {
        res
            .status(500)
            .json({
                message: 'There was an error while saving the user to the database',
            });
    }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
