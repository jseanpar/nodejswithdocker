const { Writable } = require('stream');
const { callbackify } = require('util');

const writableStream = new Writable({
    write(chunk, encoding, callback) {
        console.log(chunk.toString());
        callback();
    }
});

process.stdin.pipe(writableStream);