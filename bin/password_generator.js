const passwordData = require('./data/password_pieces'); 
const passwordGenerator = {};
// Generate Function
passwordGenerator.generatePassword = function(){
    let password = '';
    for(let i = 0; i < passwordData.nameLib.length; i++){
        password += passwordData.nameLib[i][Math.round(Math.random() * (passwordData.nameLib[i].length - 1) ) ];
    }
    return password;
}

passwordGenerator.calculateNumberOfPossibleOriginalPasswords = function(){
    console.log(passwordData.nameLib.pre1.length * passwordData.nameLib.pre2.length * passwordData.nameLib.word.length);
}
module.exports = passwordGenerator;
