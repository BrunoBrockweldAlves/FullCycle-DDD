import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import OrderModel from "./order.model";
import ProductModel from "./product.model";

@Table({
  tableName: "order_items",
  timestamps: false,
})
export default class OrderItemModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => OrderModel)
  @Column
  declare order_id: string;

  @BelongsTo(() => OrderModel)
  declare order: OrderModel;

  @AllowNull(false)
  @Column
  declare name: string;

  @AllowNull(false)
  @Column
  declare price: number;

  @AllowNull(false)
  @Column
  declare quantity: number;

  @ForeignKey(() => ProductModel)
  @Column
  declare product_id: string;

  @BelongsTo(() => ProductModel)
  product: ProductModel;
}
