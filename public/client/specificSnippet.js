var encodedBodyArr = document.querySelector('.body-encoded');
var decodedBody = decodeURI(encodedBodyArr.innerHTML);
encodedBodyArr.innerHTML = decodedBody;
