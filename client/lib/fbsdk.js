window.fbAsyncInit = function() {
  FB.init({
    appId      : '1813436898701714',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.12'
  });

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/id_ID/sdk.js#xfbml=1&version=v2.12&appId=369326503475419&autoLogAppEvents=1';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function statusChangeCallback(response) {
    if (response.status === 'connected') {
      console.log(response);
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/signin',
        data: {
          access_token: response.authResponse.accessToken,
        }
      }).then(function(response) {
        console.log(response);
        if (response.status === 200 && window.location.pathname === '/login.html') {
        localStorage.token = response.data.token;
        window.location = 'todo.html';
        }
      });
    } else {
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    }
}

function logOut() {
  localStorage.clear();
  FB.logout(function(response) {
    window.location = 'login.html';
  });
}

function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
}
