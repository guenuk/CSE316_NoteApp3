const express = require('express');
const mongoose = require('mongoose');
const Note = require('./models/note');
const User = require('./models/user');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

var mongoDB = 'mongodb://localhost:27017/Note_App';
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}

app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    // Calling next() makes it go to the next function that will handle the request
    next();
});

// ::::::NOTES:::::: Get all Notes/ Create new note / Update a note / Delete a note
const url = 'http://localhost:8500';

app.get('/api/notes', wrapAsync(async function (req,res) {
    const notes = await Note.find({});
    res.json(notes);
}));

app.post('/api/notes', wrapAsync(async function (req, res) {
    console.log("Posted with body: " + JSON.stringify(req.body));
    const newNote = new Note({
        num: req.body.num,
        text: req.body.text,
        lastUpdatedDate: req.body.lastUpdatedDate,
    })
    await newNote.save();
    res.json(newNote);
}));
app.put('/api/notes/:id', wrapAsync(async function (req, res) {
    const id = req.params.id;
    console.log("PUT with id: " + id + ", body: " + JSON.stringify(req.body));
    await Note.findByIdAndUpdate(id, {'text': req.body.text, "lastUpdatedDate": req.body.lastUpdatedDate, 'num': req.body.num},
        {runValidators: true});
    res.sendStatus(204);
}));
app.delete('/api/notes/:id', wrapAsync(async function (req, res) {
    const id = req.params.id;
    const result = await Note.findByIdAndDelete(id);
    console.log("Deleted successfully: " + result);
    res.json(result);
}));

// ::::::USER:::::: Get/Create/Update/Delete

app.get('/api/users', wrapAsync(async function (req,res) {
    const users = await User.find({});
    res.json(users);
}));

app.post('/api/users', wrapAsync(async function (req, res) {
    console.log("Posted with body: " + JSON.stringify(req.body));
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        location: req.body.location
    })
    await newUser.save();
    res.json(newUser);
}));
app.put('/api/users/:id', wrapAsync(async function (req, res) {
    const id = req.params.id;
    console.log("PUT with id: " + id + ", body: " + JSON.stringify(req.body));
    await User.findByIdAndUpdate(id, {'name': req.body.name, "email": req.body.email, "location": req.body.location},
        {runValidators: true});
    res.sendStatus(204);
}));
app.delete('/api/users/:id', wrapAsync(async function (req, res) {
    const id = req.params.id;
    const result = await User.findByIdAndDelete(id);
    console.log("Deleted successfully: " + result);
    res.json(result);
}));



port = process.env.PORT || 8500;

app.listen(port, () => { console.log('server started!')});
