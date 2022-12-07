
$("#prodBtn").click(prodLogin);
$("#sandBtn").click(sandLogin);

var apiVersion = 'v37.0',
    clientId = '3MVG9FMtW0XJDLd16RjTq6CPvecw28Vh0kS.DFi1XRMggLT9ftCSylqo6SslhCIkfczqXVNL_0w0c0GkgJtZk',
    clientSecret = '7CE1CD08F5691B019ADD541F16218C48A030E96D61156DAFE80A6AD819D82FF9',
    loginUrl = 'https://login.salesforce.com/',
    redirectURI = "https://test-lightining-out.herokuapp.com/oauthcallback.html",
    proxyURL = '/proxy/' ;
 

function prodLogin()
{
	loginUrl = 'https://login.salesforce.com/'; 
    login();
}

function sandLogin()
{
    loginUrl = 'https://test.salesforce.com/';
    login();
}
function login() {
    var url = loginUrl + 'services/oauth2/authorize?display=popup&response_type=token' +
        '&client_id=' + encodeURIComponent(clientId) +
        '&redirect_uri=' + encodeURIComponent(redirectURI);
    popupCenter(url, 'login', 700, 600);
}

function oauthCallback(response) {
    if (response && response.access_token) { 
        console.log(response);
        $.cookie("AccToken",response.access_token ) ;
        $.cookie("APIVer", apiVersion) ;
        $.cookie("InstURL",  response.instance_url) ; 
        $.cookie("idURL",  response.id) ;
        
		strngBrks = response.id.split('/');
		$.cookie("LoggeduserId",  strngBrks[strngBrks.length - 1]) ;
		
        window.location = 'Main';
    } else {
        alert("AuthenticationError: No Token");
    }
}
 

function popupCenter(url, title, w, h) {
    // Handles dual monitor setups
    var parentLeft = window.screenLeft ? window.screenLeft : window.screenX;
    var parentTop = window.screenTop ? window.screenTop : window.screenY;
    var left = parentLeft + (window.innerWidth / 2) - (w / 2);
    var top = parentTop + (window.innerHeight / 2) - (h / 2);
    return window.open(url, title, 'width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
}