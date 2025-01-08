import IRepository from "../../repository/repository-interface";
import Order from "../entity/order";

export default interface IOrderRepository extends IRepository<Order> {}
