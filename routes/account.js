const   express = require('express');
        router = express.Router(),
        db = require('../models/index'),
        nameGenerator = require('../bin/name_generator'),
        passwordGenerator = require('../bin/password_generator'),
        colorGenerator = require('../bin/color_generator');

let savedUserInfo = {},
    shownUserInfo = {};

// Generate New Username And Password
router.get('/new', (req, res) => {
    if(savedUserInfo.userName && savedUserInfo.userPassword){
        nameGenerator.findIfNameExistsInDB(savedUserInfo.userName).then(doesExist => {
            if(doesExist){
                createNewName().then(() => {
                    res.redirect('new');
                });
            } else {
                res.render('new', { shownUserInfo });
            }
        })
    }  
    else {
        createNewPassword();
        createNewColors();
        createNewName().then(() => {
            res.redirect('new');
        });
    }
});

// Create New Username only
router.get('/newname', (req, res) => {
    createNewName().then(() => {
        res.redirect('new');
    });
});

// Create New Password only
router.get('/newpassword', (req, res) => {
    createNewPassword();
    res.redirect('new');
});

// Create New Color only
router.get('/newcolor', (req, res) => {
    createNewColors();
    res.redirect('new');
});

// Confirm and Submit New Account 
router.post('/new', (req, res) => {
    nameGenerator.findIfNameExistsInDB(savedUserInfo.userName).then(doesExist => {
        if(doesExist){
            res.send('Error. Username already exists in database');
        } else {
            db.user.create({
                name: savedUserInfo.userName,
                password: savedUserInfo.userPassword,
                color1: savedUserInfo.color1,
                color2: savedUserInfo.color2
            }).then(() => {
                res.render('saved', { shownUserInfo });
            });
        }
    })
});

function createNewColors(){
    let colors = colorGenerator.generateColor();
    savedUserInfo.color1 = colors.color1;
    savedUserInfo.color2 = colors.color2;
    shownUserInfo.color1 = colorGenerator.deconstructColorCode(savedUserInfo.color1);
    shownUserInfo.color2 = colorGenerator.deconstructColorCode(savedUserInfo.color2);
}
function createNewName(){
    return nameGenerator.generateNameAndCheckIfExists().then(name => {
        savedUserInfo.userName = nameGenerator.name;
        shownUserInfo.userName = nameGenerator.capitalizeAndRemoveUnderscores(savedUserInfo.userName);
    });
}
function createNewPassword(){
    shownUserInfo.userPassword = passwordGenerator.generatePassword();
    savedUserInfo.userPassword = shownUserInfo.userPassword.toLowerCase();
}
module.exports = router;