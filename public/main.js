
$(document).ready(function () {

  var JWT = null;

  $('#adminLogin').on('submit', function(e) {
      e.preventDefault();
      $.ajax({
          url: 'login',
          type: 'POST',
          dataType: 'json',
          data: {username: $('#user_email').val(), password: $('#user_pass').val()},
          success: function(data) {
              JWT = data.token;
              window.location.href = '/home';
          }
      })
  })
});
