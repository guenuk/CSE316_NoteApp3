const express = require('express');
const mongoose = require('mongoose');
const Note = require('./models/note');
const User = require('./models/user');
const userRoutes = require('./routes/users');


const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const session = require('express-session');
const MongoStore = require('connect-mongo');
const {isLoggedIn} = require("./middleware/auth"); // MongoDB session store

var mongoDB = 'mongodb://localhost:27017/Note_App';
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}



const sessionSecret = 'make a secret string';

// Create Mongo DB Session Store
const store = MongoStore.create({
    mongoUrl: mongoDB,
    secret: sessionSecret,
    touchAfter: 24 * 60 * 60
})

// Changing this setting to avoid a Mongoose deprecation warning:
// See: https://mongoosejs.com/docs/deprecations.html#findandmodify
// mongoose.set('useFindAndModify', false);

// Setup to use the express-session package
const sessionConfig = {
    store,
    name: 'session',
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
        // later you would want to add: 'secure: true' once your website is hosted on HTTPS.
    }
}

app.use(session(sessionConfig));


app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    // Calling next() makes it go to the next function that will handle the request
    next();
});

app.use('/api', userRoutes);

app.use((err, req, res, next) => {
    console.log("Error handling called " + err);
    // If want to print out the error stack, uncomment below
    // console.error(err.stack)
    // Updating the statusMessage with our custom error message (otherwise it will have a default for the status code).
    res.statusMessage = err.message;

    if (err.name === 'ValidationError') {
        res.status(400).end();
    } else {
        // We could further interpret the errors to send a specific status based more error types.
        res.status(500).end();
    }
})

// ::::::NOTES:::::: Get all Notes/ Create new note / Update a note / Delete a note
const url = 'http://localhost:8500';

app.get('/api/notes',isLoggedIn, wrapAsync(async function (req,res) {
    const notes = await Note.find({user: req.session.userId});
    // const notes = await Note.find((note)=>{
    //     if(note.user==req.session.userId){
    //         return note;
    //     }
    // });

    // const notes = await Note.findById(req.session.userId);
    res.json(notes);
}));

app.post('/api/notes',isLoggedIn, wrapAsync(async function (req, res) {
    console.log("Posted with body: " + JSON.stringify(req.body));
    const newNote = new Note({
        num: req.body.num,
        text: req.body.text,
        lastUpdatedDate: req.body.lastUpdatedDate,
        user: req.session ? req.session.userId: null
    })
    await newNote.save();
    res.json(newNote);
}));
app.put('/api/notes/:id',isLoggedIn, wrapAsync(async function (req, res) {
    const id = req.params.id;
    console.log("PUT with id: " + id + ", body: " + JSON.stringify(req.body));
    await Note.findByIdAndUpdate(id, {'text': req.body.text, "lastUpdatedDate": req.body.lastUpdatedDate, 'num': req.body.num},
        {runValidators: true});
    res.sendStatus(204);
}));
app.delete('/api/notes/:id',isLoggedIn, wrapAsync(async function (req, res) {
    const id = req.params.id;
    const result = await Note.findByIdAndDelete(id);
    console.log("Deleted successfully: " + result);
    res.json(result);
}));

// ::::::USER:::::: Get/Create/Update/Delete

app.get('/api/users', wrapAsync(async function (req,res) {
    console.log(req.session.userId);
    const users = await User.find({_id: req.session.userId});
    console.log(users);
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
app.put('/api/users/', wrapAsync(async function (req, res) {
    console.log(req.body);
    await User.findByIdAndUpdate(req.session.userId, {'image': req.body.image, 'location': req.body.location, 'email': req.body.email, 'name':req.body.name},
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
