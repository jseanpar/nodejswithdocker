const fs = require("fs");

try {
    //toma el argumento 2 de comando ej: node sync-files.js naranja.txt
    const file = process.argv[2]; //naranja.txt

    const content = fs.readFileSync(file).toString();
    const lines = content.split('\n').length;

    console.log(lines);

} catch (err) {
    return console.log(err)
}