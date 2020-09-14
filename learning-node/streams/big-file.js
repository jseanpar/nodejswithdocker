const fs = require('fs');
const file = fs.createWriteStream('./big');

for (let i = 0; i <= 1e6; i++) {
    file.write('Estaba la pájara pinta Sentadita en el verde limón Con el pico picaba la hoja Con el pico picaba la flor');
}

file.end();