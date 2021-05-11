let chalk = require('chalk');
const text = require('./data');
function anagram(str1, str2) {

    console.log(strPreparation(str1), strPreparation(str2));
    if (strPreparation(str1)===strPreparation(str2)) return true;
    else return false;
}

function strPreparation(str) {
    let format_str = '';
    for (let i = 0; i < str.length; i++) {
        let letter = str.charCodeAt(i);
        if(letter > 64 && letter < 91 || letter > 96 && letter < 123 ||
            letter > 1039 && letter <1104 || letter == 1025 || letter == 1105 ){
            format_str +=str[i].toLowerCase();
        }
    }
    return  format_str.split('').sort().join('');
}

console.log(chalk.green(anagram('fkljЁippp', 'fkljipppЁ')));
