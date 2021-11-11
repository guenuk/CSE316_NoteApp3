const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {wrapAsync} = require('../utils/helper');

router.post('/register', wrapAsync(async function (req, res) {
    const {password, email, name} = req.body;
    // const found = await this.findOne({email});
    const found = await User.findAndValidate(email, password);
    if(!found){
        const user = new User({email, password, name})
        await user.save();
        req.session.userId = user._id;
        res.status(200).json(user);
    }
    else{
        res.sendStatus(500);
        throw new Error("ValidationError");
    }
}));

router.post('/login', wrapAsync(async function (req, res) {
    const {password, email} = req.body;
    const user = await User.findAndValidate(email, password);
    console.log("hi")
    if (user) {
        req.session.userId = user._id;
        // res.sendStatus(204);
        res.json(user);
        // return res.json(user);
    } else {
        res.sendStatus(401);
    }
}));

router.post('/logout', wrapAsync(async function (req, res) {
    req.session.userId = null;
    res.sendStatus(204);
}));

module.exports = router;