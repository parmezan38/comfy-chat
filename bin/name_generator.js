const nameData = require('./data/name_pieces');
const db = require('../models/index');

const nameGenerator = {
  name: null,
  generateNameAndCheckIfExists: function () {
    return this.findIfNameExistsInDB(this.generateName()).then(doesExist => {
      if (doesExist) {
        this.name = null;
        return this.generateNameAndCheckIfExists();
      }
      return this.name;
    });
  },
  generateName: function () {
    this.name = '';
    const namingPatterns = nameData.namingPatterns;
    const randPattern = namingPatterns[Math.round(Math.random() * (namingPatterns.length - 1))];
    const nameLib = nameData.nameLib;
    randPattern.forEach(currentType => {
      const namePiece = currentType === 'two' ? nameLib.twos[Math.round(Math.random() * (nameLib.twos.length - 1))]
        : currentType === 'three' ? nameLib.threes[Math.round(Math.random() * (nameLib.threes.length - 1))]
          : currentType === 'mid' ? nameLib.mids[Math.round(Math.random() * (nameLib.mids.length - 1))]
            : '_';
      this.name += namePiece;
    });
    return this.name;
  },
  capitalizeAndRemoveUnderscores: function (name) {
    const returnName = name.replace(/_/g, ' ');
    return returnName.replace(/\w\S*/g, function (str) {
      return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
    });
  },
  decapitalizaAndRemoveSpaces: function (name) {
    const returnName = name.replace(/ /g, '_');
    return returnName.toLowerCase();
  },
  calculateNumberOfPossibleOriginalNames: function () {
    const numOfPossibleNames = 0;
    nameData.namingPatterns.forEach(namingPattern => {
      const patternReturnNum = 1;
      const nameLib = nameData.nameLib;
      namingPattern.forEach(patternPart => {
        const num = patternPart === 'two' ? nameLib.twos.length
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
    )
      .then(found => (found !== null));
  }
};
module.exports = nameGenerator;
