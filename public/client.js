var encodedBodyArr = document.querySelectorAll('.body-encoded');
for (var i = 0; i < encodedBodyArr.length; i++) {
  var decodedBody = decodeURI(encodedBodyArr[i].innerHTML);
  encodedBodyArr[i].innerHTML = decodedBody;
}
