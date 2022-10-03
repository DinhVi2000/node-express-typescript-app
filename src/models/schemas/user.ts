import { Model, DataTypes, Sequelize } from "sequelize";

export interface UserAttributes {
  id?: number;
  first_name?: string;
  last_name?: string;
  email: string;
  password: string;
}

export interface UserAddModel {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export interface UserViewModel {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export class User extends Model<UserAttributes, UserAttributes> {
  declare id?: number;
  declare first_name?: string;
  declare last_name?: string;
  declare email: string;
  declare password: string;

  static initialize = (sequelize: any) => {
    this.init(
      {
        id: {
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.BIGINT.UNSIGNED,
        },
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      {
        sequelize, // We need to pass the connection instance
        tableName: "users", // We need to choose the table name in database
        modelName: "user",
        timestamps: true,
        paranoid: true,
        underscored: true,
        updatedAt: "updated_at",
        createdAt: "created_at",
        deletedAt: "deleted_at",
      }
    );
  };

  static associate(models: any) {
    this.belongsTo(models.Clazz, { as: "clazz", foreignKey: "clazz_id" });
  }
}
