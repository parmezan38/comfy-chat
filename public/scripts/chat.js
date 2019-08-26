// DOM Queries
const message = document.getElementById('message');
const btn = document.getElementById('send');
const username = document.getElementById('username');
const counter = document.getElementById('word-counter');
const output = document.getElementById('output');
const outputWindow = document.getElementById('output-window');
const maxNumOfListItems = 100;
username.style.backgroundColor = userInfo.color1;
username.style.color = userInfo.color2;
counter.textContent = message.value.length + '/120';

// Make Connection
const socket = io.connect('/chat');

// Emit Events
btn.addEventListener('click', () => {
  submitMessage();
});
message.addEventListener('keypress', event => {
  if (event.keyCode === 13) {
    submitMessage();
  } else {
    counter.textContent = message.value.length + '/120';
  }
});
message.addEventListener('keyup', () => {
  counter.textContent = message.value.length + '/120';
});

// Listen For Socket Events
socket.on('connect', () => {
  socket.emit('joinRoom', {
    userInfo: userInfo,
    room: room
  });
});
socket.on('chat', data => {
  addMessageToOutput(data);
  outputWindow.scrollTop = outputWindow.scrollHeight;
});
socket.on('disconnected', () => {
});

function submitMessage () {
  if (message.value.length > 0) {
    socket.emit('chat', {
      userInfo: userInfo,
      room: room,
      message: message.value
    });
    message.value = '';
  }
};
function addMessageToOutput (data) {
  const userStyle = 'style="background-color:' + data.userInfo.color1 + '; color:' + data.userInfo.color2 + ';"';
  const li = document.createElement('li');
  const classAtt = document.createAttribute('class');
  classAtt.value = 'chat-line list-group-item';
  li.setAttributeNode(classAtt);
  li.innerHTML = '<span class="user-chat-name" ' + userStyle + '><strong>' + data.userInfo.username + '</strong></span> ' + data.message;

  if (output.children.length < maxNumOfListItems) return output.appendChild(li);
  output.removeChild(output.children[0]);
  output.appendChild(li);
};