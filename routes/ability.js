var express = require('express');
var router = express.Router();
var request = require('request');
var { User, Campaign, Character, Map, Note } = require('../models/user');


router.post("/search", function(req, res, next) {
    var scryApi = "https://api.scryfall.com/cards/search?q=";
    var q = req.body.search;
    request(scryApi + q, function(error, response, body) {
        if (error) {
            return res.send(error);
        }
        var data = JSON.parse(body);
        res.send(data)
    });
});

module.exports = router;