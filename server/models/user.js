var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('../utils/validators');
var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        name: String,
        // email: String,
        email: {
            type: String,
            validate: {
                validator: validator.validateEmail,
                message: props => `${props.value} is not a valid email!`
            },
            required: true,
            trim:true,   // This will trim the whitespace automatically from the email before saving
            unique: true
        },
        location: String,
        password:{
            type:String,
            required:true,
            minlength: 6
        },
        image:{
            type:String,
            default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        }

    }
);

UserSchema.statics.findAndValidate = async function (email, password) {
    const user = await this.findOne({email});
    if(!user) {
        return false;
    }
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : false;
}

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

module.exports = mongoose.model('User', UserSchema);