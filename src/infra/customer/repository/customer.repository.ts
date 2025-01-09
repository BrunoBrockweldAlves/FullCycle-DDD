import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/entity/valueObject/address";
import ICustomerRepository from "../../../domain/repository/customer-repository-interface";
import CustomerModel from "../model/customer.model";

export default class CustomerRepository implements ICustomerRepository {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.Address._street,
      city: entity.Address._city,
      zip: entity.Address._zip,
      number: entity.Address._number,
      active: entity.isActive(),
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        id: entity.id,
        name: entity.name,
        street: entity.Address._street,
        city: entity.Address._city,
        zip: entity.Address._zip,
        number: entity.Address._number,
        active: entity.isActive(),
      },
      { where: { id: entity.id } }
    );
  }

  async findById(id: string): Promise<Customer> {
    const model = await CustomerModel.findByPk(id);

    const address = new Address(
      model.street,
      model.number,
      model.zip,
      model.city
    );
    const customer = new Customer(model.id, model.name);
    customer.Address = address;
    if (model.active) customer.activate;

    return customer;
  }

  async findAll(): Promise<Customer[]> {
    return (await CustomerModel.findAll()).map((model) => {
      const address = new Address(
        model.street,
        model.number,
        model.zip,
        model.city
      );
      const customer = new Customer(model.id, model.name);
      customer.Address = address;
      if (model.active) customer.activate;

      return customer;
    });
  }
}
