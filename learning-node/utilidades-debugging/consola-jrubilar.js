const miConsola = new console.Console(process.stdout, process.stderr);

miConsola.imprimirInfo = (msg = '') => {
    console.log('-> [Information]: %s', msg)
};

miConsola.imprimirWarning = (msg = '') => {
    console.log('-> [Warning]: %s', msg)
};

miConsola.imprimirError = (msg = '') => {
    console.log('-> [Error]: %s', msg)
};

miConsola.imprimirInfo('Hola mundo');
miConsola.imprimirWarning('Hola mundo');
miConsola.imprimirError('Hola mundo');