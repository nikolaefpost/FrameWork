
let chalk = require('chalk');

function anagram(str) {
    let  sub_str = str.split(',');
    if (strPreparation(sub_str[0])===strPreparation(sub_str[1])) return true;
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

function anagramToFile() {
    const fs = require('fs');
    const path = require('path');
    const way = path.resolve('demo/test/text.txt')
    // const way = '/Users/Ed/WebstormProjects/untitled/FrameWork/HW1/demo/test/text.txt'

    fs.readFile(way, 'utf-8',(err, content) =>{
        if (err){
            throw err
        }
        let content_str = content.split(';').reduce((accumulator, currentValue)=> {
            return accumulator += currentValue + ' => ' + anagram(currentValue);
        }, '');

        const filePath = path.join(__dirname, 'result.txt');
        fs.writeFile(filePath, content_str, err =>{
            if (err){
                throw err
            }
            console.log(chalk.blue('file prepared ok'))
        })
    })
}

anagramToFile();
