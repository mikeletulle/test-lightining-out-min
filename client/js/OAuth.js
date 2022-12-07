
$("#prodBtn").click(prodLogin);
$("#sandBtn").click(sandLogin);

var apiVersion = 'v37.0',
    clientId = '3MVG9FMtW0XJDLd16RjTq6CPveSsO8ApRFC2AYv8JVUvON.CmRYSCr6D4XzOXyZydVfJHbXGbu_RpLHB86OIk',
    clientSecret = '0E779A911DE3350A4B023C09BA89124D6158DF0943D20A95212694C8AEA87B2E',
    loginUrl = 'https://login.salesforce.com/',
    redirectURI = window.location.origin + "/oauthcallback.html",
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
		
        window.location = 'main';
    } else {
        alert("AuthenticationError: No Token");
    }
}
 

function popupCenter(url, title, w, h) {
    // Handles dual monitor setups
    console.log("Redirecting to: " + url);
    var parentLeft = window.screenLeft ? window.screenLeft : window.screenX;
    var parentTop = window.screenTop ? window.screenTop : window.screenY;
    var left = parentLeft + (window.innerWidth / 2) - (w / 2);
    var top = parentTop + (window.innerHeight / 2) - (h / 2);
    return window.open(url, title, 'width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
}