const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Picture extends Model {
        static associate(models) {

                Picture.belongsTo(models.User, {
                    foreignKey: 'user_id',
                    as: 'photographer',
                    onDelete: 'CASCADE'
                }),
                Picture.hasMany(models.Votes, {
					foreignKey: 'picture_id',
					as: 'votes',
					onDelete: 'CASCADE'
				}),
                Picture.hasOne(models.Caption, {
					foreignKey: 'picture_id',
					as: 'caption',
					onDelete: 'CASCADE'
				})
        }
    }
    Picture.init({
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'URL already exists'
            },
            validate: {
                notNull: {
                    args: true,
                    msg: 'URL is required'
                },
                notEmpty: {
                    args: true,
                    msg: 'URL cannot be empty'
                },
                isUrl: {
                    args: true,
                    msg: 'URL is not valid'
                },
                len: {
                    args: [10, 255],
                    msg: 'URL must be between 10 and 255 characters'
                }
            }
        },
        user_id: {
            allowNull: false,
            type: DataTypes.UUID
        }
    }, {
        sequelize,
        modelName: 'Picture'
    });
    return Picture
}