const nameData = require('./data/name_pieces'),
      db = require('../models/index');
const nameGenerator = {
  name: null,
  generateNameAndCheckIfExists: function () {
    return this.findIfNameExistsInDB(this.generateName()).then(doesExist => {
      if (doesExist) {
        this.name = null;
        return this.generateNameAndCheckIfExists();
      } else {
        return this.name;
      }
    });
  },
  generateName: function () {
    this.name = '';
    let namingPatterns = nameData.namingPatterns,
        randPattern = namingPatterns[Math.round(Math.random() * (namingPatterns.length - 1))],
        nameLib = nameData.nameLib;
    randPattern.forEach(currentType => {
      let namePiece = currentType === 'two' ? nameLib.twos[Math.round(Math.random() * (nameLib.twos.length - 1))]
        : currentType === 'three' ? nameLib.threes[Math.round(Math.random() * (nameLib.threes.length - 1))]
          : currentType === 'mid' ? nameLib.mids[Math.round(Math.random() * (nameLib.mids.length - 1))]
            : '_';
      this.name += namePiece;
    });
    return this.name;
  },
  capitalizeAndRemoveUnderscores: function (name) {
    let returnName = name.replace(/_/g, ' ');
    return returnName.replace(/\w\S*/g, function (str) {
      return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
    });
  },
  decapitalizaAndRemoveSpaces: function (name) {
    let returnName = name.replace(/ /g, '_');
    return returnName.toLowerCase();
  },
  calculateNumberOfPossibleOriginalNames: function () {
    let numOfPossibleNames = 0;
    nameData.namingPatterns.forEach(namingPattern => {
      let patternReturnNum = 1,
          nameLib = nameData.nameLib;
      namingPattern.forEach(patternPart => {
        let num = patternPart === 'two' ? nameLib.twos.length
          : patternPart === 'three' ? nameLib.threes.length
            : nameLib.mids.length;
        patternReturnNum *= num;
      });
      numOfPossibleNames += patternReturnNum;
    });
    console.log(numOfPossibleNames);
  },
  findIfNameExistsInDB: function (name) {
    return db.user.findOne({
      attributes: ['name'],
      where: { name }
    }
    ).then(found => { return found !== null; });
  }
};
module.exports = nameGenerator;
