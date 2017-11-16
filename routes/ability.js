var express = require('express');
var router = express.Router();
var request = require('request');
var { User, Campaign, Character, Map, Note, Ability } = require('../models/user');


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
    request(spell, function(error, response, body) {
        if (error) {
            return res.send(err);
        }
        var data = JSON.parse(body);
        res.send(data)
    });
});

router.post('/spell/add', function(req, res, next) {
    console.log('Character is ' + req.body.chararacter)
    Ability.create({
        name: req.body.name,
        abilityType: req.body.ability,
        url: req.body.spellId,
        chararacter: req.body.chararacter
    }, function(err, result) {
        if (err) {
            res.send(err.message)
        }
        console.log("The spell id is" + result._id)
        Character.update({ _id: req.body.chararacter }, { $push: { abilities: result._id } }, function(err, user) {
            if (err) console.log(err);
        })
    })
})


module.exports = router;