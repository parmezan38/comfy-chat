const passwordData = require('./data/password_pieces'); 
const passwordGenerator = {
    generatePassword: function(){
        let password = '';
        passwordData.nameLib.forEach(passwordPart => {
            password += passwordPart[Math.round(Math.random() * (passwordPart.length - 1) ) ];
        });
        return password;
    },
    calculateNumberOfPossibleOriginalPasswords: function(){
        let nameLib = passwordData.nameLib;
        console.log(nameLib.pre1.length * nameLib.pre2.length * nameLib.word.length);
    }
};
module.exports = passwordGenerator;
