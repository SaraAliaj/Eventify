const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Attendee = sequelize.define('Attendee', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    status: {
        type: DataTypes.ENUM('invited', 'confirmed', 'declined', 'maybe'),
        defaultValue: 'invited'
    },
    eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Events',
            key: 'id'
        }
    }
}, {
    tableName: 'Attendees',
    timestamps: true
});

module.exports = Attendee; 