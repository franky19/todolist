
const { Sequelize} = require('sequelize');

export const sequelize = new Sequelize('todo', 'root', '#Mysql123', {
    host: 'localhost',
    dialect: 'mysql',
});

// Sync the model with the database
sequelize.sync().then(() => {
    console.log('Database and tables synced.');
});