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

function toLogin() {
 //以下为按钮点击事件的逻辑。注意这里要重新打开窗口
 //否则后面跳转到QQ登录，授权页面时会直接缩小当前浏览器的窗口，而不是打开新窗口
 var A=window.open("/aboutus","TencentLogin", "width=450,height=320,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1");
} 
