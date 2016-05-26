
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

// will .value =''; all passed elemet IDs (sould pass input type elements)
function clearInputs() {
  for (i = 0; i < arguments.length; i++) {
    let inp = arguments[i]
    document.getElementById(inp).value = ''
  }
}

// clear #inputText and update counts
function clearInputText() {
  clearInputs('inputText')
  inputTextCounter();
  updateStatus('Cleared!', 'b3b3b3')
  focusHere('inputText')
}

// parameter 'element' should be the element ID name w/o the #
// this element # is where what we want to copy
function copyFrom(element) {
  if (checkInputValue(element)) {
    let selector = document.querySelector('#' + element)
    selector.select()
    let successful = document.execCommand('copy')
    if (successful) {
      updateStatus('Copied to clipboard!', '33adff')
    } else {
      updateStatus('Unable to copy!', 'red')
    }
  } else {
    updateStatus('No text to copy!', 'red')
  }
}

// Case converter for 'inputText' input field
function convertInputCase(newCase){
  if (checkInputValue('inputText')) {
    let n = document.getElementById('inputText').style.textTransform = newCase
    if (n) {
      updateStatus('Case converted', 'blue')
      return n
    }
  } else
  { updateStatus('No text to manipulate', 'red') }
}

// Capitalize first word by searching for dots in 'inputText' and
// capitalize the forst word after it
function capitalizeFirst(){
  if (!checkInputValue('inputText')) {
    updateStatus('No text to manipulate!', 'red')
  } else {
    input = document.getElementById('inputText').value
    s = input.split('.')
      t = [], g= []
    for (i = 0; i < s.length; i++) {
      t[i] = $.trim(s[i])
      g[i] = capFirst(t[i])
    }
    //document.getElementById('inputText').style.textTransform = none
    document.getElementById('inputText').value = g.join('. ')
    updateStatus('Case converted', 'blue')
  }
}

function capFirst(str) {
  m = str.split(' ')
  r = m[0].replace(m[0].charAt(0), m[0].charAt(0).toUpperCase())
  m[0] = r
  return m.join(' ')
}

//
function countMatches(str1, str2) {
  if (!checkInputValue(str2)) {
    updateStatus('No text to search for matches!', 'red')
  } else {
    let findThis = document.getElementById(str1).value
    if (findThis) {
      let matches = matchesFound(findThis, document.getElementById(str2).value)
      updateStatus('Found <b>' + matches + '</b> matches!', 'orange')
    } else {
      updateStatus('What would you like to count?', 'red')
    }
  }
}

//
function removeAString(str1, str2) {
  if (!checkInputValue(str2)) {
    updateStatus('No text to manipulate!', 'red')
  } else {
    let removeThis = document.getElementById(str1).value,
        fromThis   = document.getElementById(str2).value
    if (removeThis) {
      document.getElementById(str2).value = deleteStrings(fromThis, removeThis)
      inputTextCounter();
      updateStatus('Found and removed <b>' + matchesFound(removeThis, fromThis) + '</b>  times!', 'orange')
    } else {
      updateStatus('What would you like to remove?', 'red')
    }
  }
}

// expects 1+ args of strings, and remove them from inputText
function removeTashkeel(){
  if (!checkInputValue('inputText')) {
    updateStatus('No text to manipulate!', 'red')
  } else {
    let t = arguments, f = 0, fromThis = document.getElementById('inputText')
    for (i = 0; i < t.length; i++) {
      let inp = t[i]
      f += matchesFound(inp, fromThis.value)
      fromThis.value = deleteStrings(fromThis.value, inp)
    }
    inputTextCounter();
    updateStatus('تم حذف  <b>' + f + '</b>  خانة', 'orange')
  }
}

function removeAString(str1, str2) {
  if (!checkInputValue(str2)) {
    updateStatus('No text to manipulate!', 'red')
  } else {
    let removeThis = document.getElementById(str1).value,
        fromThis   = document.getElementById(str2).value
    if (removeThis) {
      document.getElementById(str2).value = deleteStrings(fromThis, removeThis)
      inputTextCounter();
      updateStatus('Found and removed <b>' + matchesFound(removeThis, fromThis) + '</b>  times!', 'orange')
    } else {
      updateStatus('What would you like to remove?', 'red')
    }
  }
}

// will replace strings from interface
function replaceStrings() {
  if (!checkInputValue('inputText')) {
    updateStatus('No text to manipulate!', 'red')
  } else {
    let replaceThis = document.getElementById('replaceThis').value
    if (replaceThis) {
      let withThis = document.getElementById('withThis').value,
          inThis = document.getElementById('inputText').value
      document.getElementById('inputText').value = doReplace(replaceThis, withThis, inThis)
      inputTextCounter();
      updateStatus('Replaced <b>' + matchesFound(replaceThis, inThis) + '</b> times!', 'orange')


    } else {
      updateStatus('What would you like to replace?', 'red')
    }
  }
}


// save value from input.value to 'textified file' + ext
// first argument expected to be a dot<something>
// second argument expected to be the input element ID
// TODO fix: it doesn't save in the same case sensitivity
function downloadAs(ext, input) {
  if (!checkInputValue('inputText')) {
    updateStatus('No text to save!', 'red')
  } else {
    var a = document.body.appendChild(document.createElement('a'));
    a.download = 'textified file' + ext;
    a.href = 'data:text/html,' + document.getElementById(input).value;
    a.click();
  }
}


//
function scramble(type) {
  if (!checkInputValue('inputText')) {
    updateStatus('No text to scramble!', 'red')
  } else {
    input = document.getElementById('inputText').value
    switch(type) {
        case 'sentences':
          c = doReplace(' ,', ', ', shuffle(input.split(', ')).join(', '))
          d = doReplace('.', '. ', shuffle(c.split('.')).join('.'))
          document.getElementById('inputText').value = doReplace('  ', ' ', d)
          updateStatus('Sentences scrambled', 'green')
        break;

        case 'words':
          n = input.split(' ')
          w = shuffle(n).join(' ')
          document.getElementById('inputText').value = w
          updateStatus('Words scrambled', 'green')

        break;

        case 'letters':
          n = input.split(' ')
          for (i = 0; i < n.length; i++) {
            n[i] = shuffle(n[i].split('')).join('')
          }
          document.getElementById('inputText').value = n.join(' ')
          updateStatus('Letters scrambled', 'green')

        break;

        default:
    }
  }
}

// Fisher–Yates shuffle https://bost.ocks.org/mike/shuffle/
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

// expects 3 strings, 1st= what to replace, 2nd= with what, 3rd= in what
function doReplace(str1, str2, str3){
  return str3.split(str1).join(str2);
}

// expects a string and 1+ other parameters to be removed from
// the string 'fromThis'
function deleteStrings(str1, str2){
  return str1.split(str2).join('');
}

// will return an integer of the number of times 'thisString' was
// found in 'inThisString'
function matchesFound(thisString, inThisString) {
  return inThisString.split(thisString).length - 1
}

// boolean checker if this ID's element has a .value
function checkInputValue(inputID) {
  return ((document.getElementById(inputID).value) ? 1 : 0)
}

// updates innerHTML in #status
function updateStatus(message, color) {
  let statusText = document.getElementById('status')
  statusText.innerHTML = message
  statusText.style.color = color
}
