const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide your username'],
        maxlength: [20, 'Username cannot be more 20 characters']
    },
    firstname: {
        type: String,
        required: [true, 'Enter your First name']
    },
    lastname: {
        type: String,
        required: [true, 'Enter your Last name']
    },
    age: {
        type: String
    },
    birth_date: {
        type: Date
    },
    country: {
        type: String
    },
    zip_code: {
        type: Number
    },
    access: {
        type: String
    },
    phone_number: {
        type: String
    },
    image_profile: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Enter your Email']
    },
    password: {
        type: String,
        required: [true, 'Enter your Password']
    },
    role: {
        type: String,
        enum: ["Admin", "Moderator", "User"],
        default: "User"
    },
    active: {
        type: Boolean,
        default: false
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    last_login: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        // remove these props when object is serialized
        delete ret._id
        delete ret.username;
        delete ret.email;
        delete ret.password;
        delete ret.role;
        delete ret.active;
        delete ret.likes;
        delete ret.dislikes;
    }
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);