import { DataTypes, Model } from 'sequelize'

interface ClazzAttributes {
  id?: number
  name: string
  code: string
  ability: string
}

export class Clazz extends Model<ClazzAttributes, ClazzAttributes> {
  declare id?: number

  declare name: string

  declare code: string

  declare ability: string

  static initialize = (sequelize: any) => {
    this.init({
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT.UNSIGNED,
      },
      name: DataTypes.STRING,
      code: DataTypes.STRING,
      ability: DataTypes.STRING,
    }, {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      tableName: 'clazz_masters', // We need to choose the table name in database
      modelName: 'clazz',
      timestamps: true,
      paranoid: true,
      underscored: true,
      updatedAt: 'updated_at',
      createdAt: 'created_at',
      deletedAt: 'deleted_at',
    })
  }
}
