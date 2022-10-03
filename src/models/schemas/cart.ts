import { Model, DataTypes } from "sequelize";

interface UserAttributes {
  id: number;
}

export class Cart extends Model<UserAttributes, UserAttributes> {
  declare id: number;

  static initialize = (sequelize: any) => {
    this.init(
      {
        id: {
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.BIGINT.UNSIGNED,
        },
      },
      {
        sequelize, // We need to pass the connection instance
        tableName: "carts", // We need to choose the table name in database
        modelName: "cart",
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
    this.belongsTo(models.User, { as: "users", foreignKey: "user_id" });
  }
}
