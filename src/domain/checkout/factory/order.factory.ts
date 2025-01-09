import Order from "../entity/order";
import OrderItem from "../entity/order_item";

interface IOrderProps {
  orderId: string;
  customerId: string;
  items: {
    itemId: string;
    name: string;
    price: number;
    productId: string;
    quantity: number;
  }[];
}

export default class OrderFactory {
  public static create(props: IOrderProps): Order {
    const order = new Order(
      props.orderId,
      props.customerId,
      props.items.map(
        (i) =>
          new OrderItem(
            i.itemId,
            props.orderId,
            i.name,
            i.price,
            i.productId,
            i.quantity
          )
      )
    );

    return order;
  }
}
