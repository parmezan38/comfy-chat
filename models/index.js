'use strict';
const fs = require('fs'),
      path = require('path'),
      Sequelize = require('sequelize'),
      basename = path.basename(__filename),
      env = process.env.NODE_ENV || 'development',
      config = require(path.join(__dirname, '/../config/config.json'))[env],
      sequelize = new Sequelize(config.database, config.username, config.password, {
        dialect: 'postgres',
        operatorsAliases: false
      });
const db = {
  user: sequelize['import']('./users')
};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.sequelize.authenticate().then(() => {
  console.log('Database connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

module.exports = db;
