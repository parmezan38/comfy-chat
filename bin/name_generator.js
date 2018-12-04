const nameData = require('./data/name_pieces');
const db = require('../models/index');
const nameGenerator = {
    name: null,
    generateNameAndCheckIfExists: function(){
        return this.findIfNameExistsInDB(this.generateName()).then(doesExist => {
            if(doesExist){
                this.name = null;
                return this.generateNameAndCheckIfExists();
            } else {
                return this.name;
            }
        });
    },
    generateName: function(){
        this.name = '';
        let randPattern = nameData.namingPatterns[Math.round(Math.random() * (nameData.namingPatterns.length - 1) )];
        randPattern.forEach(currentType => {
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
        });
        return this.name;
    },
    capitalizeAndRemoveUnderscores: function(name){
        let returnName = name.replace(/_/g, ' ');
        return returnName.replace(/\w\S*/g, function(str){
            return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
        });
    },
    decapitalizaAndRemoveSpaces: function(name){
        let returnName = name.replace(/ /g, '_');
        return returnName.toLowerCase();
    },
    calculateNumberOfPossibleOriginalNames: function(){
        let numOfPossibleNames = 0;
        nameData.namingPatterns.forEach(namingPattern => {
            let patternReturnNum = 1;
            namingPattern.forEach(patternPart => {
                if (patternPart === 'two'){
                    patternReturnNum *= nameData.nameLib.twos.length; }
                else if(patternPart === 'three'){
                    patternReturnNum *= nameData.nameLib.threes.length; }
                else if(patternPart === 'mid'){
                    patternReturnNum *= nameData.nameLib.mids.length; } 
            });
            numOfPossibleNames += patternReturnNum; 
        });
        console.log(numOfPossibleNames);
    },
    findIfNameExistsInDB: function(name){
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
};
module.exports = nameGenerator;