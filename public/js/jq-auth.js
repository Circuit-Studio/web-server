var timerFunc;


$('#register').submit(function (e) {
  e.preventDefault();
  let username = $('#username').val();
  let password = $('#password').val();
  let email = $('#email').val();

  let data = {
      "username": username,
      "password": password,
      "email": email
  };

  $.post('/register', data, function(data){
      window.location.assign("/");
  }).catch((err) => {
      errorWindow(err);
  });
});

$('#login').submit(function (e) {
  e.preventDefault();
  let email = $('#email').val();
  let password = $('#password').val();

  let data = {
      "email": email,
      "password": password
  };

  $.post('/login', data, function(data){
      window.location.assign("/");
  }).catch((err) => {
      errorWindow(err);
  });

});

// Showing the error window
const errorWindow = function(err){
    clearTimeout(timerFunc);
    $('#errorbox').html(err.responseText);
    $('#errorbox').show();
    timerFunc = window.setTimeout(hidewindow, 1000);
};

// Actually hide it
const hidewindow = function(){
    $('#errorbox').fadeOut(400);
};
