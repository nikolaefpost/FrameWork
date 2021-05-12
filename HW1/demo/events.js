const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.on('anything', data => {
    console.log('ON:anything', data)
})
emitter.emit('anything', {a:1});

