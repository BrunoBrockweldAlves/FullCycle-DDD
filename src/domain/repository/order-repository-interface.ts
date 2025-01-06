import Order from "../entity/order/order";
import IRepository from "./repository-interface";

export default interface IOrderRepository extends IRepository<Order> {}
