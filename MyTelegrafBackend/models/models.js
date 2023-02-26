const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: "User" },
    name: { type: DataTypes.STRING, },
    surname: {type: DataTypes.STRING},
    nickname: { type: DataTypes.STRING, unique: true, allowNull: false},
})

const Dialog = sequelize.define('dialog', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
})

const Message = sequelize.define('message', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    message: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
})

const UserDialog = sequelize.define('user_dialog', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

const News = sequelize.define('news', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false }
})


User.belongsToMany(Dialog, { through: UserDialog })
Dialog.belongsToMany(User, { through: UserDialog })

User.hasMany(Dialog)
Dialog.hasOne(User)

Dialog.hasMany(Message)
Message.belongsTo(Dialog)

User.hasMany(Message)
Message.belongsTo(User, { as: 'user' })
//Message.hasOne(User)

UserDialog.belongsTo(Message)
Message.hasOne(UserDialog)

module.exports = {
    User,
    Dialog,
    Message,
    UserDialog,
    News
}
