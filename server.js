require('dotenv').config();

const bodyParser = require('body-parser');
const chalk = require('chalk');
const express = require('express');
const mongodb = require('mongodb');
const util = require('util');

const app = express();
const ObjectID = mongodb.ObjectID;
const port = process.env.PORT || 8080;
const CONTACTS_COLLECTION = 'contacts';

app.use(bodyParser.json());

// Create a database variable outside of the database callback to reuse
// the connection pool in your app.
let db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, (err, database) => {
    if (err) {
        console.log('Error connecting to MongoDB: ', err);
        process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = database;
    console.log('Database connection ready');

    // Initialize the app.
    let server = app.listen(port, () => {
        util.log(`App now running on port ${chalk.cyan(port)}`);
    });
});

// Generic error handler by all endpoints.
function handleError(res, reason, message, code) {
    console.log("Error: ", reason);
    res.status(code || 500).json({"error": message});
}

// Get all contacts
app.get('/api/contacts', (req, res) => {
    db.collection(CONTACTS_COLLECTION).find({}).toArray((err, data) => {
        if (err) {
            handleError(res, err.message, 'Failed to get contacts.');
        } else {
            res.status(200).json(data);
        }
    });
});

app.post('/api/contacts', (req, res) => {
    let newContact = req.body;

    if (!req.body.name) {
        handleError(res, 'Invalid user input.', 'Must provide a name.', 400);
    }

    db.collection(CONTACTS_COLLECTION).insertOne(newContact, (err, doc) => {
        if (err) {
            handleError(res, err.message, 'Failed to create new contact.');
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
});

app.get('/api/contacts/:id', (req, res) => {});

app.put('/api/contacts/:id', (req, res) => {});

app.delete('/api/contacts/:id', (req, res) => {});
