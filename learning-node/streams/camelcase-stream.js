const { Transform } = require('stream');

const camelStream = new Transform({
    transform(chunk, encoding, callback) {
        const data = chunk.toString();

        data.split(" ").map((word) => {
            this.push(word.charAt(0).toUpperCase() + word.slice(1));
        });
    }
});

process.stdin.pipe(camelStream).pipe(process.stdout);