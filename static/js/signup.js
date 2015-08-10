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

function checkPass() {
    //Store the password field objects into variables ...
    var pass1 = document.getElementById('password');
    var pass2 = document.getElementById('password2');
    //Store the Confimation Message Object ...
    var message = document.getElementById('confirmMessage');
    //Set the colors we will be using ...
    var goodColor = "#66cc66";
    var badColor = "#ff6666";
    //Compare the values in the password field 
    //and the confirmation field
    if(pass1.value == pass2.value){
        //The passwords match. 
        //Set the color to the good color and inform
        //the user that they have entered the correct password 
        pass2.style.backgroundColor = goodColor;
        message.style.color = goodColor;
        message.innerHTML = "输入的密码相同！"
    }else{
        //The passwords do not match.
        //Set the color to the bad color and
        //notify the user.
        pass2.style.backgroundColor = badColor;
        message.style.color = badColor;
        message.innerHTML = "输入的密码不相同！"
    }
}  
