function DoThis(manipulation){

    var inputText = document.getElementById("inputText").value;
    if (inputText) {
      switch(manipulation) {
        case 'lowerCase':
            document.getElementById("inputText").style.textTransform = "lowercase";
            document.getElementById("status").style.color = 'blue';
            document.getElementById("status").innerHTML = 'lowercase all Done!';
        break;

        case 'upperCase':
            document.getElementById("inputText").style.textTransform = "uppercase";
            document.getElementById("status").style.color = 'blue';
            document.getElementById("status").innerHTML = 'UPPERCASE ALL Done!';
        break;

        case 'titleCase':
            document.getElementById("inputText").style.textTransform = "capitalize";
            document.getElementById("status").style.color = 'blue';
            document.getElementById("status").innerHTML = 'Title Case All Done!';
        break;

        case 'clearStatus':
            document.getElementById("status").innerHTML = '';
        break;

        case 'clearInput':
            document.getElementById("inputText").value = '';
            document.getElementById("inputText").style.textTransform = "none";
            document.getElementById("inputText").focus();
            document.getElementById("charcounts").innerHTML = 0;
            document.getElementById("wordcounts").innerHTML = 0;
            document.getElementById("status").style.color = 'b3b3b3';
            document.getElementById("status").innerHTML = 'Cleared!';
        break;

        case 'copyInput':
            var selector = document.querySelector('#inputText');
            selector.select();
            try {
            var successful = document.execCommand('copy');
            if (successful) {
                document.getElementById("status").style.color = 'green';
                document.getElementById("status").innerHTML = 'Copied Successfully!';
              } else {
                document.getElementById("status").style.color = 'red';
                document.getElementById("status").innerHTML = 'Unable to copy!';
            }
            } catch (err) {
                console.log('Oops, unable to copy');
            }
        break;

        case 'countMatches':
            var matchText = document.getElementById("match").value;
            if (matchText) {
                var matches = inputText.split(matchText).length - 1;
                document.getElementById("status").style.color = 'blue';
                document.getElementById("status").innerHTML = 'Found <b>' + matches + '</b> matches!';
                } else {
                document.getElementById("status").style.color = 'red';
                document.getElementById("status").innerHTML = 'What would you like to count?';
            }
        break;

        case 'removeSomething':

            var toRemove = document.getElementById("toRemove").value;
            if (toRemove) {
                var found = inputText.split(toRemove).length - 1;

                cleared = inputText.split(toRemove).join('');
                document.getElementById("inputText").value = cleared;
                inputCounter();
                document.getElementById("status").style.color = 'blue';
                document.getElementById("status").innerHTML = 'Found and removed <b>' + found + '</b> times!';

            } else {
                document.getElementById("status").style.color = 'red';
                document.getElementById("status").innerHTML = 'What would you like to remove?';
            }
        break;

        case 'replaceSomething':
            var replaceThis = document.getElementById("replaceThis").value;
            var withThis = document.getElementById("withThis").value;
            if (replaceThis && withThis) {
                replaced = inputText.split(replaceThis).join(withThis);
                document.getElementById("inputText").value = replaced;
                var replaced = inputText.split(replaceThis).length - 1;
                inputCounter();
                document.getElementById("status").style.color = 'blue';
                document.getElementById("status").innerHTML = 'Replaced <b>' + replaced + '</b> times!';
            } else {
                document.getElementById("status").style.color = 'red';
                document.getElementById("status").innerHTML = 'What would you like to replaces?';
            }
        break;

        default:

        } // end of: switch (manipulation)
    } else {
      document.getElementById("status").innerHTML = 'Enter some text..';

    }

    // document.getElementById("status").innerHTML = 'Case: ' + manipulation;

}








 function inputCounter() {
     document.getElementById("status").innerHTML = '';
     var inputText = $.trim(document.getElementById("inputText").value.replace( /  +/g, ' ' ));
     var inputLength = inputText.length;
     document.getElementById("charcounts").innerHTML = inputLength;
     if (inputLength) {
       document.getElementById("wordcounts").innerHTML = inputText.split(' ').length;
     } else {
       document.getElementById("wordcounts").innerHTML = 0;
     }
 }
