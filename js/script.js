function clearInput() {
    document.getElementById("inputText").value = '';
    document.getElementById("inputText").style.textTransform = "none";
    document.getElementById("status").innerHTML = '';
    document.getElementById("charcounts").innerHTML = 0;
    document.getElementById("wordcounts").innerHTML = 0;
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

////

function copyInput() {
  if (document.getElementById("inputText").value) {
  var copyTextarea = document.querySelector('#inputText');
    copyTextarea.select();
    try {
      var successful = document.execCommand('copy');
      if (successful) {
        document.getElementById("status").style.color = 'green';
        document.getElementById("status").innerHTML = 'Copied Successfully!';
      }
       else {
         document.getElementById("status").style.color = 'red';
         document.getElementById("status").innerHTML = 'Unable to copy!';
       }

    } catch (err) {
      console.log('Oops, unable to copy');
    }
  } else {
    document.getElementById("status").style.color = 'blue';
    document.getElementById("status").innerHTML = 'There is nothing to copy!';
    }
    fadeoutStatus();
}

///

function lowerCase(){
  var lowerCaseit = document.getElementById("inputText").value;
  if (lowerCaseit) {
  document.getElementById("inputText").style.textTransform = "lowercase";
  document.getElementById("status").style.color = 'blue';
  document.getElementById("status").innerHTML = 'lowercase all Done!';
  fadeoutStatus();
  }
}

function upperCase(){
  var upperCaseit = document.getElementById("inputText").value;
  if (upperCaseit) {
  document.getElementById("inputText").style.textTransform = "uppercase";
  document.getElementById("status").style.color = 'blue';
  document.getElementById("status").innerHTML = 'UPPERCASE ALL Done!';
  fadeoutStatus();
  }
}

function TitleCase(){
  var toTitleCase = document.getElementById("inputText").value;
  if (toTitleCase) {
    document.getElementById("inputText").style.textTransform = "capitalize";
    document.getElementById("status").style.color = 'blue';
    document.getElementById("status").innerHTML = 'Title Case All Done!';
    fadeoutStatus();
    }
}

function capFirst() {
  var capFirst = document.getElementById("inputText").value;

    var fixed = capFirst.replace(/.+?[\.\?\!](\s|$)/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
      document.getElementById("inputText").innerHTML = fixed;

}
////

function countOccurence(){
  var matchText = document.getElementById("match").value;
  if (matchText) {
      var inputText = document.getElementById("inputText").value;
      var matches = inputText.split(matchText).length - 1;
      document.getElementById("status").style.color = 'blue';
      document.getElementById("status").innerHTML = 'Found <b>' + matches + '</b> matches!';
      return matches;
  } else {
    document.getElementById("status").innerHTML = 'Enter something to find out!';
    fadeoutStatus();
  }
}

function removeSomething(){
  var toRemove = document.getElementById("toRemove").value;
   if (toRemove) {
    var inputText = document.getElementById("inputText").value;
    var found = inputText.split(toRemove).length - 1;

    cleared = inputText.split(toRemove).join('');
    document.getElementById("inputText").value = cleared;
    inputCounter();
    document.getElementById("status").style.color = 'blue';
    document.getElementById("status").innerHTML = 'Found and removed <b>' + found + '</b> times!';

  }
else {
  document.getElementById("status").innerHTML = 'Enter what would you like to remove!';
  fadeoutStatus();
  }
}

function replaceSomething(){
  var replaceThis = document.getElementById("replaceThis").value;
  var withThis = document.getElementById("withThis").value;
  if (replaceThis && withThis) {
    var inputText = document.getElementById("inputText").value;
    replaced = inputText.split(replaceThis).join(withThis);
    document.getElementById("inputText").value = replaced;
    var foundReplaceThis = inputText.split(replaceThis).length - 1;
    inputCounter();
    document.getElementById("status").style.color = 'blue';
    document.getElementById("status").innerHTML = 'Replaced <b>' + foundReplaceThis + '</b> times!';


  }
  else {
    document.getElementById("status").innerHTML = 'Fill out what do you want to replace!';
    fadeoutStatus();
  }
}

function clearStatus() {
  document.getElementById("status").innerHTML = '';
 }

 function fadeoutStatus(){
   $("#status").fadeOut(2800, function() {
     document.getElementById("status").innerHTML = '';
     $("#status").show();
     });
 }
