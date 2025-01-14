import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import CustomerModel from "../../customer/model/customer.model";
import OrderItemModel from "./order-item.model";

@Table({
  tableName: "orders",
  timestamps: false,
})
export default class OrderModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => CustomerModel)
  @Column
  declare customer_id: string;

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel;

  @AllowNull(false)
  @Column
  declare total: number;

  @HasMany(() => OrderItemModel)
  declare items: OrderItemModel[];
}
