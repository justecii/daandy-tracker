var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 99
    },
    email: { // TODO: Need to add email validation
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 99
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 99
    },
    profilePic: {
        type: String
    },
    campaigns: [{ type: Schema.ObjectId, ref: 'Campaign' }]
});

// Override 'toJSON' to prevent the password from being returned with the user
userSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        var returnJson = {
            id: ret._id,
            email: ret.email,
            name: ret.name
        };
        return returnJson;
    }
});

userSchema.methods.authenticated = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res ? this : false);
        }
    });
}

// Mongoose's version of a beforeCreate hook
userSchema.pre('save', function(next) {
    var hash = bcrypt.hashSync(this.password, 10);
    // store the hash as the user's password
    this.password = hash;
    next();
});

var campaignSchema = new mongoose.Schema({
    title: {
        type: String,
        // required: true,
        minlength: 1,
        maxlength: 99
    },
    users: [{ type: Schema.ObjectId, ref: 'User' }],
    characters: [{ type: Schema.ObjectId, ref: 'Character' }],
    maps: [{ type: Schema.ObjectId, ref: 'Map' }],
    notes: [{ type: Schema.ObjectId, ref: 'Note' }]
});

var characterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 40
    },
    image: String,
    race: String,
    class: String,
    alignment: String,
    level: Number,
    campaign: { type: Schema.Types.ObjectId, ref: 'Campaign' },
    abilities: [{ type: Schema.ObjectId, ref: 'Ability' }]
});

var mapSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 99
    },
    image: {
        type: String,
        required: true
    },
    campaign: { type: Schema.Types.ObjectId, ref: 'Campaign' }
});

var noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 99
    },
    content: {
        type: String,
        required: true
    },
    campaign: { type: Schema.Types.ObjectId, ref: 'Campaign' }
})

var abilitySchema = new mongoose.Schema({
    name: {
        type: String
    },
    abilityType: {
        type: String
    },
    url: {
        type: String
    },
    char: { type: Schema.Types.ObjectId, ref: "Character" }
})

var User = mongoose.model('User', userSchema);
var Campaign = mongoose.model('Campaign', campaignSchema);
var Character = mongoose.model('Character', characterSchema);
var Map = mongoose.model('Map', mapSchema);
var Note = mongoose.model('Note', noteSchema);
var Ability = mongoose.model('Ability', abilitySchema);


module.exports = {
    User: User,
    Campaign: Campaign,
    Character: Character,
    Map: Map,
    Note: Note,
    Ability: Ability
};