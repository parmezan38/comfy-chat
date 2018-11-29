const nameGenerator = require('./data/name_pieces');
const db = require('../models/index');

// Generate Function
nameGenerator.name = null;
nameGenerator.generateNameAndCheckIfExists = function(){
    return nameGenerator.findIfNameExistsInDB(nameGenerator.generateName()).then(doesExist => {
        if(doesExist){
            nameGenerator.name = null;
            return nameGenerator.generateNameAndCheckIfExists();
        } else {
            return nameGenerator.name;
        }
    });
}
nameGenerator.generateName = function(){
    nameGenerator.name = '';
    let randPattern = nameGenerator.namingPatterns[Math.round(Math.random() * (nameGenerator.namingPatterns.length - 1) )];
    for(let i = 0; i < randPattern.length; i++){
        let currentType = randPattern[i];
        if (currentType === 'two'){
            nameGenerator.name += nameGenerator.nameLib.twos[Math.round(Math.random() * (nameGenerator.nameLib.twos.length - 1) )];
        }
        else if(currentType === 'three'){
            nameGenerator.name += nameGenerator.nameLib.threes[Math.round(Math.random() * (nameGenerator.nameLib.threes.length - 1) )];
        }
        else if(currentType === 'mid'){
            nameGenerator.name += nameGenerator.nameLib.mids[Math.round(Math.random() * (nameGenerator.nameLib.mids.length - 1) )];
        }
        else if(currentType === 0){
            nameGenerator.name += '_';
        }
    }
    return nameGenerator.name;
}
// Capitalize Name (samo privremeno dok ne nades minimalnije rjesenje)
nameGenerator.capitalizeAndRemoveUnderscores = function(name){
    let returnName = name.replace(/_/g, ' ');
    return returnName.replace(/\w\S*/g, function(str){
        return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
    });
}
nameGenerator.decapitalizaAndRemoveSpaces = function(name){
    let returnName = name.replace(/ /g, '_');
    return returnName.toLowerCase();
}
nameGenerator.calculateNumberOfPossibleOriginalNames = function(){
    let numOfPossibleNames = 0;
    for(let i = 0; i < nameGenerator.namingPatterns.length; i++){
        let patternReturnNum = 1;
        for(let j = 0; j < nameGenerator.namingPatterns[i].length; j++){
            if (nameGenerator.namingPatterns[i][j] === 'two'){
                patternReturnNum *= nameGenerator.nameLib.twos.length; }
            else if(nameGenerator.namingPatterns[i][j] === 'three'){
                patternReturnNum *= nameGenerator.nameLib.threes.length; }
            else if(nameGenerator.namingPatterns[i][j] === 'mid'){
                patternReturnNum *= nameGenerator.nameLib.mids.length; } 
        }
        numOfPossibleNames += patternReturnNum; 
    }
}

nameGenerator.findIfNameExistsInDB = function(name){
    return db.user.findOne({ 
        attributes: ['name'],
        where: {name: name} }
    ).then(found => {
        if (found !== null) {
            return true;
        }
        return false;
    });
}
module.exports = nameGenerator;