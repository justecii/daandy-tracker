var express = require('express');
var router = express.Router();
var request = require('request');
var { User, Campaign, Character, Map, Note } = require('../models/user');


router.post("/spells", function(req, res, next) {
    var dndApi = "http://dnd5eapi.co/api/spells/";
    request(dndApi, function(error, response, body) {
        if (error) {
            return res.send(error);
        }
        var data = JSON.parse(body);
        res.send(data)
    });
});

router.post('/spell/search', function(req, res, next) {
    var spell = req.body.search;
    console.log("THIS WAS CLICKED")
    request(spell, function(error, response, body) {
        if (error) {
            return res.send(err);
        }
        var data = JSON.parse(body);
        res.send(data)
    });
});

module.exports = router;