# Comfy Chat
Comfy Chat is a simple chat site that has chat rooms with limited number od users in them. Messages have a limited number of characters to avoid large swaths of text. 
Comfy Chat uses Socket.io (https://socket.io/) for real-time chatting and NoSpyAcc(https://github.com/parmezan38/nospyacc) for user accounts. 

## Getting Started

Install dependencies:

```npm install```

Initialize sequelize:

```sequelize init```

Change your user, password,database and dialect info from /config/config.json, NoSpyAcc uses PostgreSQL with Sequelize, but there should be no problems with using other Sequelize supported dialects,

Migrate the database:

```sequelize db:migrate```

Start the server:

```node app.js```
