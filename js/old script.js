function inputCounter() {
     document.getElementById("status").innerHTML = '';
     var inputText = $.trim(document.getElementById("inputText").value.replace( /  +/g, ' ' ));
     var inputLength = inputText.length;
     if (inputLength) {
       document.getElementById("charcounts").innerHTML = inputLength;
       document.getElementById("wordcounts").innerHTML = inputText.split(' ').length;
     } else {
       document.getElementById("charcounts").innerHTML = 0;
       document.getElementById("wordcounts").innerHTML = 0;
     }
     convertCase(none);
 }

function clearInputs(){
    for (i = 0; i < arguments.length; i++) {
        var inp = arguments[i];
        document.getElementById(inp).value = '';
        if (inp == 'inputText') {
          updateStatus('b3b3b3', 'Cleared');
          document.getElementById("inputText").focus();
          inputCounter();
          //convertCase(none);
        }
    }
}

function convertCaseTo(toCase){
  document.getElementById("inputText").style.textTransform = toCase;
  document.getElementById("inputText").focus();
  updateStatus('blue', 'Case converted');
}

function DoThis(manipulation){
    var inputText = document.getElementById("inputText").value;
    if (inputText) {
      switch(manipulation) {
        case 'copyInput':
            var selector = document.querySelector('#inputText');
            selector.select();
            try {
            var successful = document.execCommand('copy');
            if (successful) {
                updateStatus('green', 'Copied to clipboard!');
              } else {
                updateStatus('red', 'Unable to copy!');
            }
            } catch (err) {
                console.log('Oops, unable to copy');
            }
        break;

        case 'countMatches':
            var matchText = document.getElementById("match").value;
            if (matchText) {
                var matches = inputText.split(matchText).length - 1;
                updateStatus('blue', 'Found <b>' + matches + '</b> matches!');
                } else {
                  updateStatus('red', 'What would you like to count?');
            }
        break;

        case 'removeSomething':
            var toRemove = document.getElementById("toRemove").value;
            if (toRemove) {
                var found = inputText.split(toRemove).length - 1;
                cleared = inputText.split(toRemove).join('');
                document.getElementById("inputText").value = cleared;
                inputCounter();
                updateStatus('blue', 'Found and removed <b>' + found + '</b> times!');
            } else {
              updateStatus('red', 'What would you like to remove?');
            }
        break;

        case 'replaceSomething':
            var replaceThis = document.getElementById("replaceThis").value;
            var withThis = document.getElementById("withThis").value;
            if (replaceThis && withThis) {
                var replaced = inputText.split(replaceThis).join(withThis);
                document.getElementById("inputText").value = replaced;
                var replaced = inputText.split(replaceThis).length - 1;
                inputCounter();
                updateStatus('blue', 'Replaced <b>' + replaced + '</b> times!');
            } else {
                updateStatus('red', 'What would you like to replaces?');
            }
        break;

        default:

        } // end of: switch (manipulation)
    } else {
      updateStatus('red', 'Enter some text..');
    }
    // document.getElementById("status").innerHTML = 'Case: ' + manipulation;
}

//
function updateStatus(color, message) {
    document.getElementById("status").style.color = color;
    document.getElementById("status").innerHTML = message;
}


function scramble(text){
  var inputText = document.getElementById("inputText").value;
  if (inputText) {
  var toScramble = inputText.split('');
  document.getElementById(text).value = toScramble;
  document.getElementById("status").innerHTML = toScramble.length + ' sentences ';
  } else {
    updateStatus('red', 'Enter some text..');

  }
}



//
//
// function saveAsPDF() {
//   var doc = new jsPDF();
//   var specialElementHandlers = {
//       '#editor': function (element, renderer) {
//           return true;
//       }
//   };
//     doc.fromHTML($('#inputText').html(), 15, 15, {
//         'width': 170,
//             'elementHandlers': specialElementHandlers
//     });
//     doc.save('sample-file.pdf');
// });
