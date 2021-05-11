const fs = require('fs');
const path = require('path');

// fs.mkdir(path.join(__dirname, 'test'), (err)=>{
//     if (err){
//         throw err
//     }
//     console.log('Folder make')
// });

// const filePath = path.join(__dirname, 'test', 'text.txt');
// fs.writeFile(filePath, 'hello NodeJs!', err =>{
//     if (err){
//         throw err
//     }
//     console.log('file make')
// })
//
// fs.appendFile(filePath, '\nhello again!', err =>{
//     if (err){
//         throw err
//     }
//     console.log('file make')
// })

fs.readFile(filePath, 'utf-8',(err, content) =>{
    if (err){
        throw err
    }
    console.log('content: ', content)
})