$('#register').submit(function (e) {
  let timerFunc;

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
      console.log(err.responseText);
      clearTimeout(timerFunc);
      $('#errorbox').html(err.responseText);
      $('#errorbox').show();
      timerFunc = window.setTimeout(hidewindow, 1000);
  });

  const hidewindow = function(){
      $('#errorbox').fadeOut(400);
  };
});

$('#login').submit(function (e) {
  let timerFunc;

  e.preventDefault();
  let email = $('#email').val();
  let password = $('#password').val();

  let data = {
      "email": email,
      "password": password
  };

  $.post('/login', data, function(data){
      console.log(data)
      console.log("HELLO")
  }).catch((err) => {
      $('#errorbox').html(err.responseText);
      $('#errorbox').show();
      timerFunc = window.setTimeout(hidewindow, 1000);
  });

  const hidewindow = function(){
      $('#errorbox').fadeOut(400);
  };
});
