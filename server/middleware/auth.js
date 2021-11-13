const {wrapAsync} = require('../utils/helper');
const Note = require('../models/note')

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.session.userId) {
        throw new Error("Need to login first");
    }
    next();
}

// If the author has an agent, the logged in user must be that agent to access


module.exports.isUser = wrapAsync(async (req, res, next) => {
    const id = req.params.id;
    const note = await Note.findById(id);
    if (note.user && !note.user.equals(req.session.userId)) {
        throw new ExpressError("Not an authorized agent for this author", 401);
    }
    next();
});