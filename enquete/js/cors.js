function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}
function makeCorsRequest(data, success, error) {
  var url = 'https://form-to-db.herokuapp.com/';
  var body = JSON.stringify(data);
  var xhr = createCORSRequest('POST', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }
  xhr.setRequestHeader('Content-Type', 'application/json');
  // Response handlers.
  xhr.onload = success;
  // Error Handler
  xhr.onerror = error;
  xhr.send(body);
}

function adfinitasIO(data, orgID, webhookID, success, error) {
	var url = 'https://adfinitas-io.herokuapp.com/api/v1/organization/' + orgID +
		'/webhook/' + webhookID;
  var body = JSON.stringify(data);
  var xhr = createCORSRequest('POST', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }
  xhr.setRequestHeader('Content-Type', 'application/json');
	if (success) {
		// Response handlers.
		xhr.onload = success;
	}
	if (error) {
		// Error Handler
		xhr.onerror = error;
	}
	xhr.send(body);
}
