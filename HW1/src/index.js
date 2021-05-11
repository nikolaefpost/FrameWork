let chalk = require('chalk');
const text = require('./data');
function anagram(str) {
    let sub_str = str.split(' ')
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
    const notes = '/Users/Ed/WebstormProjects/untitled/FrameWork/HW1/demo/test/text.txt'

    fs.readFile(notes, 'utf-8',(err, content) =>{
        if (err){
            throw err
        }
        let result ='';
        let cont_arr = content.split('\n')
        for (let i = 0; i < cont_arr.length; i++) {
            result += cont_arr[i] + '=>' + anagram(cont_arr[i])+ '\n'
        }

        const filePath = path.join(__dirname, 'result.txt');
        fs.writeFile(filePath, result, err =>{
            if (err){
                throw err
            }
            console.log('file make')
        })
    })
}

anagramToFile();
