const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Event = sequelize.define('Event', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    category: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 10
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
}, {
    tableName: 'Events',
    timestamps: true
});

module.exports = Event; 