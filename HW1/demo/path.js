const path = require('path');

console.log('Название файла: ', path.basename(__filename));

console.log('Имя директории: ', path.dirname(__filename));

console.log('Расширение файла: ', path.resolve(__filename));

console.log('Parse: ', path.parse('c:/Users/Ed/WebstormProjects/untitled/FrameWork/HW1/demo/test/text.txt'));

console.log(path.join(__dirname, 'server', 'index.html'));

