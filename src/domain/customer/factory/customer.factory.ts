import Customer from "../entity/customer";
import { v4 as uuid } from "uuid";
import Address from "../entity/valueObject/address";

export default class CustomerFactory {
  public static createCustomer(name: string): Customer {
    return new Customer(uuid(), name);
  }

  public static createWithAddress(name: string, address: Address): Customer {
    const customer = new Customer(uuid(), name);
    customer.Address = address;
    return customer;
  }
}
