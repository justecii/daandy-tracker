var express = require('express');
var router = express.Router();
var { User, Campaign, Character, Map, Note } = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    // res.send('respond with a resource');
    User.find({}, function(err, users) {
        if (err) return console.log(err);
        res.send(users)
    })
});
//get all of a users campaigns
router.post('/campaign', function(req, res, next) {
    console.log(req.body.user)
    console.log(req.body)
    Campaign.find({ users: req.body.user }, function(err, campaigns) {
        if (err) return console.log(err);
        res.send(campaigns)
    });
});
//get active users for a current campaign - first searches for the campaign, then takes user values and searches users
router.post('/active', function(req, res, next) {
    console.log("this is the campaign Id " + req.body.campaign)
    Campaign.find({ _id: req.body.campaign }, function(err, campaign) {
        if (err) return console.log(err);
        res.send(campaign)
    });
});

router.post('/list', function(req, res, next) {
    Campaign.find({ _id: req.body.id }, function(err, campaign) {
        if (err) return console.log(err);
        res.send(campaign)
    });
});

router.post('/campaign/new', function(req, res, next) {
    Campaign.create({
        users: req.body.user.id,
        title: req.body.title
    }, function(err, result) {
        if (err) {
            res.send(err.message)
        }
        console.log("The campaign id is" + result._id)
        User.update({ _id: req.body.user.id }, { $push: { campaigns: result._id } }, function(err, user) {
            if (err) console.log(err);
            console.log("results" + user._id)
        })
    });
})

router.post('/chars', function(req, res, next) {
    console.log("this is the campaign Id " + req.body.campaign)
    Character.find({ campaign: req.body.campaign }, function(err, character) {
        if (err) return console.log(err);
        res.send(character)
    });
});
//gets individual character and sends back to be rendered
router.post('/chars/:id', function(req, res, next) {
    Character.find({ _id: req.body.id }, function(err, character) {
        if (err) return console.log(err)
        res.send(character)
    })
})
router.post('/chars/new', function(req, res, next) {
    Character.create({
        name: req.body.name,
        level: req.body.level,
        race: req.body.race,
        class: req.body.charClass,
        alignment: req.body.align,
        image: req.body.image,
        campaign: req.body.campaign
    }, function(err, user) {
        if (err) {
            res.send(err.message)
        }
    });
});
router.post('/maps', function(req, res, next) {
    Map.find({ campaign: req.body.campaign }, function(err, map) {
        if (err) return console.log(err)
        res.send(map)
    })
})
router.post('/maps/new', function(req, res, next) {
    Map.create({
        title: req.body.title,
        image: req.body.image,
        campaign: req.body.campaign
    }, function(err, result) {
        if (err) {
            res.send(err.message)
        }
    });
});
//gets individual map and sends back to be rendered
router.post('/map/:id', function(req, res, next) {
    Map.find({ _id: req.body.id }, function(err, maps) {
        if (err) return console.log(err)
        res.send(maps)
    })
})

router.post('/notes', function(req, res, next) {
        Note.find({ campaign: req.body.campaign }, function(err, note) {
            if (err) return console.log(err)
            res.send(note)
        })
    })
    //gets individual note and sends it back to be rendered
router.post('/note/:id', function(req, res, next) {
        Note.find({ _id: req.body.id }, function(err, note) {
            if (err) return console.log(err)
            res.send(note)
        })
    })
    //creates a new note to the notes collection
router.post('/notes/new', function(req, res, next) {
    Note.create({
        title: req.body.title,
        content: req.body.content,
        campaign: req.body.campaign
    }, function(err, result) {
        if (err) {
            res.send(err.message)
        }
    });
});

module.exports = router;