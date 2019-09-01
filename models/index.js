const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV;
const db = {};
const host = process.env.MYSQL_HOST;
const port = process.env.MYSQL_PORT;

const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host,
    dialect: 'mysql',
    port,
    env,
    freezeTableName: true,
    dialectOptions: {
      ssl: 'Amazon RDS',
    },
    pool: { maxConnections: 5, maxIdleTime: 30 },
  }
);

// loops through each file in models folder and associates them if association exists
fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

//establishes the connection with db
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
        console.log('Unable to connect to the database.', `${err}`);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
