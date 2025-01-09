import { v4 as uuid } from "uuid";
import OrderFactory from "./order.factory";

describe("Order factory unit tests", () => {
  it("should create an order", () => {
    // Arrange
    const orderProps = {
      orderId: uuid(),
      customerId: uuid(),
      items: [
        {
          itemId: uuid(),
          name: "Product",
          price: 5,
          productId: uuid(),
          quantity: 3,
        },
      ],
    };

    // Act
    const order = OrderFactory.create(orderProps);

    // Assert
    expect(order.Id).toBe(orderProps.orderId);
    expect(order.CustomerId).toBe(orderProps.customerId);
    expect(order.Items.length).toBe(1);
    expect(order.Total).toBe(15);
    expect(order.Items[0].OrderId).toBe(orderProps.orderId);
    expect(order.Items[0].Name).toBe("Product");
    expect(order.Items[0].ItemPrice).toBe(5);
    expect(order.Items[0].TotalPrice).toBe(15);
    expect(order.Items[0].ProductId).toBe(orderProps.items[0].productId);
    expect(order.Items[0].Quantity).toBe(3);
  });
});
