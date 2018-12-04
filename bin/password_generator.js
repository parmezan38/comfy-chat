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
        console.log(passwordData.nameLib.pre1.length * passwordData.nameLib.pre2.length * passwordData.nameLib.word.length);
    }
};
module.exports = passwordGenerator;
