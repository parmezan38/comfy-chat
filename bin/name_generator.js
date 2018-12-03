const nameData = require('./data/name_pieces');
const db = require('../models/index');
const nameGenerator = {};
// Generate Function
nameGenerator.name = null;
nameGenerator.generateNameAndCheckIfExists = function(){
    return this.findIfNameExistsInDB(this.generateName()).then(doesExist => {
        if(doesExist){
            this.name = null;
            return this.generateNameAndCheckIfExists();
        } else {
            return this.name;
        }
    });
}
nameGenerator.generateName = function(){
    this.name = '';
    let randPattern = nameData.namingPatterns[Math.round(Math.random() * (nameData.namingPatterns.length - 1) )];
    for(let i = 0; i < randPattern.length; i++){
        let currentType = randPattern[i];
        if (currentType === 'two'){
            this.name += nameData.nameLib.twos[Math.round(Math.random() * (nameData.nameLib.twos.length - 1) )];
        }
        else if(currentType === 'three'){
            this.name += nameData.nameLib.threes[Math.round(Math.random() * (nameData.nameLib.threes.length - 1) )];
        }
        else if(currentType === 'mid'){
            this.name += nameData.nameLib.mids[Math.round(Math.random() * (nameData.nameLib.mids.length - 1) )];
        }
        else if(currentType === 0){
            this.name += '_';
        }
    }
    return this.name;
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
    for(let i = 0; i < nameData.namingPatterns.length; i++){
        let patternReturnNum = 1;
        for(let j = 0; j < nameData.namingPatterns[i].length; j++){
            if (nameData.namingPatterns[i][j] === 'two'){
                patternReturnNum *= nameData.nameLib.twos.length; }
            else if(nameData.namingPatterns[i][j] === 'three'){
                patternReturnNum *= nameData.nameLib.threes.length; }
            else if(nameData.namingPatterns[i][j] === 'mid'){
                patternReturnNum *= nameData.nameLib.mids.length; } 
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