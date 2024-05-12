const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Votes extends Model {
        static associate(models) {
            Votes.belongsTo(models.Picture, {
				foreignKey: 'photo_id',
				as: 'Picture',
				onDelete: 'CASCADE'
			}),
            Votes.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'user',
                onDelete: 'CASCADE'
            });
        }
    }
    Votes.init({
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Value is required'
                },
                isInt: {
                    args: true,
                    msg: 'Value must be an integer'
                },
                min: {
                    args: [0],
                    msg: 'Value must be greater than or equal to 0'
                },
                max: {
                    args: [5],
                    msg: 'Value must be less than or equal to 5'
                },
            }
        },
        picture_id: {
            allowNull: false,
            type: DataTypes.UUID,
        },
        user_id: {
            allowNull: false,
            type: DataTypes.UUID,
        }
    }, {
        sequelize,
        modelName: 'Votes'
    })
    return Votes
}