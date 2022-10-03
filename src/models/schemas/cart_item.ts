import { Model, DataTypes } from "sequelize";

interface CartItemAttributes {
  id: number;
}

export class CartItem extends Model<CartItemAttributes, CartItemAttributes> {
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
        tableName: "cart_items", // We need to choose the table name in database
        modelName: "cart_item",
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
    this.belongsTo(models.Cart, { as: "cart", foreignKey: "cart_id" });
    this.belongsTo(models.Product, { as: "product", foreignKey: "product_id" });
  }
}
