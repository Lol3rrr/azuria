const Http = new XMLHttpRequest();
const url = 'http://azuria.lol3r.net/api';

function addStats(stats) {
  console.log(stats);

  document.getElementById('userCount').innerHTML = stats["numplayers"];
  document.getElementById('maxUsers').innerHTML = stats["maxplayers"];
  document.getElementById('motd').innerHTML = stats["motd"];
  document.getElementById('ip').innerHTML = stats["hostip"];
  document.getElementById('port').innerHTML = stats["hostport"];
  document.getElementById('version').innerHTML = stats["version"];

  let userParentDom = document.getElementById('users');
  for (userIndex in stats.players) {
    let user = stats.players[userIndex]

    if (document.getElementById(user) == undefined) {
      let userDom = document.createElement('p')
      userDom.innerHTML = user;
      userDom.id = user;

      userParentDom.appendChild(userDom);
    }
  }
}

function loadFullStat() {
  let statUrl = url + "/fullStat"

  Http.open("GET", statUrl);
  Http.send();

  Http.onreadystatechange = (e) => {
    if (Http.status != 200) {
      console.log("Error");

      return;
    }

    let response = Http.responseText;
    if (response == "") {
      return;
    }

    function replaceAll(str, find, replace) {
      return str.replace(new RegExp(find, 'g'), replace);
    }

    response = replaceAll(response, "'", '"');
    let stats = JSON.parse(response);

    addStats(stats);
  }
}

window.onload = function() {
  loadFullStat()
}
