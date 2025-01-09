import {
  AllowNull,
  Column,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "customers",
  timestamps: false,
})
export default class CustomerModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @AllowNull(false)
  @Column
  declare name: string;

  @AllowNull
  @Column
  declare street: string;

  @AllowNull
  @Column
  declare number: number;

  @AllowNull
  @Column
  declare zip: string;

  @AllowNull
  @Column
  declare city: string;

  @AllowNull(false)
  @Column
  declare active: boolean;
}
