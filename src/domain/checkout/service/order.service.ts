import Order from "../entity/order";

export default class OrderService {
  static SumOrders(orders: Order[]): number {
    return orders.reduce((i, order) => (i += order.Total), 0);
  }
}
