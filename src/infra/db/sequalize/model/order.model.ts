import {
  AllowNull,
  Column,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "orders",
  timestamps: false,
})
export default class OrderModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @AllowNull(false)
  @Column
  declare name: string;

  @AllowNull(false)
  @Column
  declare price: number;
}
