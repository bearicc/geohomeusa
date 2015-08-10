function showPassword() {

  var key_attr = $('#password').attr('type');

  if(key_attr != 'text') {

      $('.checkbox').addClass('show');
      $('#password').attr('type', 'text');
      $('#password2').attr('type', 'text');

  } else {

      $('.checkbox').removeClass('show');
      $('#password').attr('type', 'password');
      $('#password2').attr('type', 'password');

  }
}

var secs =5; // counter
var URL ;
function Load(url) {
  URL =url;
  for(var i=secs;i>=0;i--) {
      window.setTimeout('doUpdate(' + i + ')', (secs-i) * 1000);
  }
}
function doUpdate(num) {
  document.getElementById('autojump').innerHTML = 'You have already logged in, now jumping to blog in '+num+' seconds ...' ;
  if(num == 0) { window.location=URL; }
}
