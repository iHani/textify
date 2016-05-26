// Counter for characters and words in the selected for the inputText element
function inputTextCounter() {
    document.getElementById('status').innerHTML = '';
    var inputText = $.trim(document.getElementById('inputText').value.replace(/  +/g, ' '));
    var inputLength = inputText.length;
    if (inputLength) {
        document.getElementById('charcounts').innerHTML = inputLength;
        document.getElementById('wordcounts').innerHTML = inputText.split(' ').length;
    } else {
        document.getElementById('charcounts').innerHTML = 0;
        document.getElementById('wordcounts').innerHTML = 0;
    }
}

// Convert bewtween lower/upper/capitalize cases
function convertCase(element, newCase) {
    var input = document.getElementById(element).value;
    if (isThereAnInput(element)) {
        document.getElementById(element).style.textTransform = newCase;
        if (newCase == 'lowerCase') {
            var m = 'lower case all done!'
        }
        if (newCase == 'upperCase') {
            var m = 'UPPER CASE ALL DONE!'
        }
        if (newCase == 'capitalize') {
            var m = 'Capitalize All Done!'
        }
        updateStatus(m, '0052cc');
    } else {
        updateStatus('No text to manipulate!', 'red');
    }
    focusHere('inputText');
}

// Boolean checker of the length of the element 'here'
function isThereAnInput(here) {
    return ((document.getElementById(here).value.length) ? 1 : 0);
}

// will .value =''; all passed elemet IDs (sould pass input type elements)
function clearInputs() {
    for (i = 0; i < arguments.length; i++) {
        var inp = arguments[i];
        document.getElementById(inp).value = '';
    }
}

function clearInputText() {
    clearInputs('inputText');
    inputTextCounter();
    updateStatus('Cleared!', 'b3b3b3');
    focusHere('inputText');
}


// parameter 'element' should be the element ID name w/o the #
// this element # is where what we want to copy
function copyFrom(element) {
    if (isThereAnInput(element)) {
        var selector = document.querySelector('#' + element);
        selector.select();
        try {
            var successful = document.execCommand('copy');
            if (successful) {
                updateStatus('Copied to clipboard!', '33adff');
            } else {
                updateStatus('Unable to copy!', 'red');
            }
        } catch (err) {
            console.log('Oops, unable to copy');
        }
    } else {
        updateStatus('Nothing to copy!', 'red');
    }
}

function countMatches() {
    if (isThereAnInput('inputText')) {
        var matchText = document.getElementById('match').value;
        if (matchText) {
            var matches = document.getElementById('inputText').value.split(matchText).length - 1;
            updateStatus('Found <b>' + matches + '</b> matches!', 'orange');
        } else {
            updateStatus('What would you like to count?', 'red');
        }
    } else {
        updateStatus('No text to search for matches!', 'red');
    }
}

//
function removeSomething() {
    if (isThereAnInput('inputText')) {
        var toRemove = document.getElementById('toRemove').value;
        if (toRemove) {
            var inputText = document.getElementById('inputText').value;
            var found = inputText.split(toRemove).length - 1;
            cleared = inputText.split(toRemove).join('');
            document.getElementById('inputText').value = cleared;
            inputTextCounter();
            updateStatus('Found and removed <b>' + found + '</b> times!', 'orange');
        } else {
            updateStatus('What would you like to remove?', 'red');
        }
    } else {
        updateStatus('No text to manipulate!', 'red');
    }
}

// accepts strngs NOT HTML elements
function doRemove(removeThis, fromThis) {
    return fromThis.split(removeThis).join('');
}

function removaaa(s1, s2) {
    let removeThis = document.getElementById(str1).value,
        fromThis = document.getElementById(str2).value;
    let cleaned = removeThings(fromThis, removeThis);
    document.getElementById(str2).value = cleaned;
    updateStatus('No text to manipulate!', 'yellow');

}

function removeThings(fromHere) {
    for (i = 1; i < arguments.length; i++) {
        var inp = arguments[i];
        fromHere.split(inp).join('');
    }
}


// TODO shuold take 2+ params: 1st is the FromThis string we want
// to removeThis from, 2nd+ params are the things toBeRemoved => for تشكيل or multiple removeals => TODO enter words separatd by comma to remove with one click
//
function replaceSomething() {
    if (isThereAnInput('inputText')) {
        var replaceThis = document.getElementById('replaceThis').value;
        var withThis = document.getElementById('withThis').value;
        if (replaceThis && withThis) {
            var inputText = document.getElementById('inputText').value;
            var replaced = replace(replaceThis, withThis, 'inputText');
            document.getElementById('inputText').value = replaced;
            var replaced = inputText.split(replaceThis).length - 1;
            inputTextCounter();
            updateStatus('Replaced <b>' + replaced + '</b> times!', 'orange');

        } else {
            updateStatus('What would you like to replaces?', 'red');
        }
    } else {
        updateStatus('No text to manipulate!', 'red');
    }
}

// returns a string after replacing the first arg with the second
// arg in the third input value ID. First two arguments expects
// strings, third argument exepects an input element ID with
// a valid strings in it
function replace(thisString, withThis, inThis) {
    return document.getElementById(inThis).value.split(thisString).join(withThis);
}

//Updating innerHTML and color of the status span
function updateStatus(message, color) {
    document.getElementById('status').innerHTML = message;
    document.getElementById('status').style.color = color;
}

// will focus on element
function focusHere(elementID) {
    document.getElementById(elementID).focus();
}

// save value from input.value to 'textified file' + ext
// first argument expected to be a dot<something>
// second argument expected to be the input element ID
// TODO fix: it doesn't save in the same case sensitivity
function downloadAs(ext, input) {
    if (isThereAnInput(input)) {
        var a = document.body.appendChild(document.createElement('a'));
        a.download = 'textified file' + ext;
        a.href = 'data:text/html,' + document.getElementById(input).value;
        a.click();
    } else {
        updateStatus('Nothing to save!', 'red');
    }
}

// scramble
function scramble(elementID, how) {
    var input = document.getElementById(elementID),
        method = findMethod(elementID, how),
        array = input.value.split(method),
        shuffled = shuffle(array),
        scrambled = shuffled.join(method);
    input.value = scrambled;
}

function findMethod(elementID, method) {
    switch (method) {
        case 'SinP':
            return '. ';
            break;

        case 'WinS':
            return ' ';
            break;

        case 'LinW':
            return '';
            break;

        case 'WandL':
            return '';
            break;

    }
}


//Fisher–Yates shuffle https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
    var m = array.length,
        t, i;
    // While there remain elements to shuffle…
    while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);
        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}
