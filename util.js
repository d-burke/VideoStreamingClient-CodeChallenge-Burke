function convertObjPathStringToKeysArray(path) {
    var letters = path.split('');
    let keyLettersTemp = [];
    let keys = [];
    let quoteChar = '';
    let squareChar = '';
    for (let i = 0; i < letters.length; i++) {
        if (quoteChar.length > 0) {
            if (letters[i] === quoteChar) {
                quoteChar = '';
                keys.push(keyLettersTemp.join(''));
                keyLettersTemp = [];
            } else {
                keyLettersTemp.push(letters[i]);
            }
        } else if (letters[i] === `"` || letters[i] === `'`) {
            keys.push(keyLettersTemp.join(''));
            keyLettersTemp = [];
            quoteChar = letters[i];
        } else if (squareChar.length > 0) {
            if (letters[i] === `]`) {
                squareChar = '';
                keys.push(keyLettersTemp.join(''));
                keyLettersTemp = [];
            } else {
                keyLettersTemp.push(letters[i]);
            }
        } else if (letters[i] === `[`) {
            keys.push(keyLettersTemp.join(''));
            keyLettersTemp = [];
            squareChar = letters[i];
        } else if (letters[i] === '.') {
            keys.push(keyLettersTemp.join(''));
            keyLettersTemp = [];
        } else {
            keyLettersTemp.push(letters[i]);
        }
        if (i === letters.length - 1) {
            keys.push(keyLettersTemp.join(''));
        }
    }
    keys = keys.filter((element) => element.length > 0);
    return keys;
}

function safeAccessObj(obj, keys = []) {
    for (let i = 0; i < keys.length; i++) {
        if (!obj || typeof obj !== 'object') {
            return undefined;
        }
        obj = obj[keys[i]];
    }
    return obj;
}
