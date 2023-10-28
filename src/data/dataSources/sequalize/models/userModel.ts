import { Model, DataTypes } from 'sequelize'
import { StatusEnum } from '../../../../domain/entities/user';
import sequelize from '../dbConfig';
class UserModel extends Model {
    public id!: number;
    public nombres!: string;
    public apellidos!: string;
    public edad!: number;
    public telefono!: number;
    public email!: string;
    public status!: StatusEnum;
}

UserModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombres: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellidos: {
            type: DataTypes.STRING,
            allowNull: false
        },
        edad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        telefono: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['activo', 'inactivo'],
            defaultValue: StatusEnum.ACT
        },
    },
    {
        sequelize,
        modelName: 'User', // Nombre del modelo
        tableName: 'users', // Nombre de la tabla en la base de datos
    }

);

export default UserModel;