# Comfy Chat
Comfy Chat is an app for simpler and cleaner chatting experience. It uses chat rooms with limited number of users in them. Messages have a limited number of characters to avoid large swaths of text. 
Comfy Chat uses [Socket.io](https://socket.io/) for real-time chatting and [NoSpyAcc](https://github.com/parmezan38/nospyacc) for user accounts.

## Getting Started

Install dependencies:

```npm install```

Install sequelize-cli:
```npm install sequelize-cli```
or install it globally if the above method is giving you issues:
```npm install -g sequelize-cli```

Initialize sequelize:
```sequelize init```

Change your user, password,database and dialect info from /config/config.json, NoSpyAcc uses PostgreSQL with Sequelize, but there should be no problems with using other Sequelize supported dialects.
```
"username": "yourusername",
"password": "yourpassword",
"database": "databasename",
"host": "yourhostname",
"dialect": "postgres"
```
Migrate the database:

```sequelize db:migrate```

Start the server:

```node app.js```
