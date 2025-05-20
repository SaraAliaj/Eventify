const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configure MySQL database connection
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT || 3306,
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
        dialectOptions: {
            dateStrings: true,
            typeCast: true
        },
        timezone: '+01:00' // Set the correct timezone for your location
    }
);

module.exports = sequelize; 