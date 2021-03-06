const rooms = document.getElementById('rooms');
setTimeout('location.reload(true);', 5000);

function showLobby (root) {
  while (rooms.firstChild) {
    rooms.removeChild(rooms.firstChild);
  }
  const ul = document.createElement('ul');
  const classAtt = document.createAttribute('class');
  classAtt.value = 'list-group';
  ul.setAttributeNode(classAtt);
  root.appendChild(ul);

  const lobbySorted = lobby.sort(compareLobbyByUsers);
  lobbySorted.forEach(room => {
    const li = document.createElement('li');
    const classAtt = document.createAttribute('class');
    li.innerHTML = '<span><strong>' + room.name + ' - Users: ' + room.users.length + '/' + room.maxUsers + '</strong></span>';

    if (room.users.length < room.maxUsers) {
      // Avaliable Link
      li.innerHTML += '<a href="/chat/' + room.id + '" class="btn btn-outline-secondary">Join ' + room.name + '</a>';
      classAtt.value = 'list-group-item list-group-item-primary';
    } else {
      // Unavailable Link
      classAtt.value = 'list-group-item list-group-item-dark';
    }

    li.setAttributeNode(classAtt);
    ul.appendChild(li);
  });
};
function compareLobbyByUsers (a, b) {
  return a.users.length - b.users.length;
};
showLobby(rooms);
