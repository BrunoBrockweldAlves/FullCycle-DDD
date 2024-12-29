import Order from "../../entity/order/order";
import OrderItem from "../../entity/order/order_item";
import OrderService from "./order.service";

describe("Order service tests", () => {
  it("Should sum the value of all orders.", () => {
    // Arrange
    let items = [new OrderItem("Id123", "Batata", 3, "productId1", 2)];
    const order1 = new Order("Id123", "CustomerId1", items);
    const order2 = new Order("Id345", "CustomerId1", items);

    // Act
    const result = OrderService.SumOrders([order1, order2]);

    // Assert
    expect(result).toBe(12);
  });
});
