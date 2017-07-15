var encodedBodyArr = document.querySelectorAll('.body-encoded');
for (var i = 0; i < encodedBodyArr.length; i++) { // Decodes the encoded body text and displays properly
  var decodedBody = decodeURI(encodedBodyArr[i].innerHTML);
  encodedBodyArr[i].innerHTML = decodedBody;
}
