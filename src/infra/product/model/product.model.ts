import {
  AllowNull,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import OrderItemModel from "../../checkout/model/order-item.model";

@Table({
  tableName: "products",
  timestamps: false,
})
export default class ProductModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @AllowNull(false)
  @Column
  declare name: string;

  @AllowNull(false)
  @Column
  declare price: number;

  @HasMany(() => OrderItemModel)
  declare orderItems: OrderItemModel[];
}
