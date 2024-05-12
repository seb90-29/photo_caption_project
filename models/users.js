const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Picture, {
                    foreignKey: 'user_id',
                    as: 'pictures',
                    onDelete: 'CASCADE'
                }),
                User.hasMany(models.Caption, {
                    foreignKey: 'user_id',
                    as: 'captions',
                    onDelete: 'CASCADE'
                }),
                User.hasMany(models.Votes, {
                    foreignKey: 'user_id',
                    as: 'votes',
                    onDelete: 'CASCADE'
                })
        }
    }
    User.init({
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Username already exists'
            },
            validate: {
                notNull: {
                    args: true,
                    msg: 'Username is required'
                },
                notEmpty: {
                    args: true,
                    msg: 'Username cannot be empty'
                },
                len: {
                    args: [3, 30],
                    msg: 'Username must be between 3 and 30 characters'
                },
                isAlphanumeric: {
                    args: true,
                    msg: 'Username can only contain letters and numbers'
                },
                not: {
                    args: /(;\")?(--|SELECT|INSERT|UPDATE|DELETE|UNION|EXEC|DROP|ALTER)(\s+)/i,
                    msg: 'Password contains invalid characters',
                },
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Invalid email address'
                },
                notNull: {
                    args: true,
                    msg: 'Email is required'
                },
                notEmpty: {
                    args: true,
                    msg: 'Email cannot be empty'
                },
                max: {
                    args: 50,
                    msg: 'Email is too long'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Password cannot be empty',
                },
                len: {
                    args: [8, 75],
                    msg: 'Password must be between 8 and 20 characters long',
                },
                not: {
                    args: /(;\")?(--|SELECT|INSERT|UPDATE|DELETE|UNION|EXEC|DROP|ALTER)(\s+)/i,
                    msg: 'Password contains invalid characters',
                },
            },
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'user',
            validate: {
                isIn: {
                    args: [
                        ['user', 'admin']
                    ],
                    msg: 'Invalid role. Must be user or admin.'
                }
            }
        },
    })
    return User
};