import Customer from "../entity/customer/customer";
import IRepository from "./repository-interface";

export default interface ICustomerRepository extends IRepository<Customer> {}
