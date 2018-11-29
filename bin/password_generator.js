const passwordGenerator = require('./data/password_pieces'); 
// Generate Function
passwordGenerator.generatePassword = function(){
    let password = '';
    for(let i = 0; i < passwordGenerator.nameLib.length; i++){
        password += passwordGenerator.nameLib[i][Math.round(Math.random() * (passwordGenerator.nameLib[i].length - 1) ) ];
    }
    return password;
}

passwordGenerator.calculateNumberOfPossibleOriginalPasswords = function(){
    console.log(passwordGenerator.nameLib.pre1.length * passwordGenerator.nameLib.pre2.length * passwordGenerator.nameLib.word.length);
}

module.exports = passwordGenerator;