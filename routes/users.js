var express = require('express');
var router = express.Router();
var { User, Campaign } = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/campaign', function(req, res, next) {
    console.log(req.body.user)
    console.log(req.body)
    Campaign.find({ users: req.body.user }, function(err, campaigns) {
        if (err) return console.log(err);
        res.send(campaigns)
    });
});

router.post('/list', function(req, res, next) {
    console.log("I am Here!")
    Campaign.find({ _id: req.body.id }, function(err, campaign) {
        if (err) return console.log(err);
        res.send(campaign)
    });
});

router.post('/campaign/new', function(req, res, next) {
    Campaign.create({
        users: req.body.user.id,
        title: req.body.title
    }, function(err, user) {
        if (err) {
            res.send(err.message)
        }
    });
})

module.exports = router;