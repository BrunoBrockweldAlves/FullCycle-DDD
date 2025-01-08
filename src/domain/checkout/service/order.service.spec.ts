import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service tests", () => {
  it("Should sum the value of all orders.", () => {
    // Arrange
    let items1 = [
      new OrderItem("Id123", "Id123", "Batata", 3, "productId1", 2),
    ];
    const order1 = new Order("Id123", "CustomerId1", items1);
    let items2 = [
      new OrderItem("Id123", "Id345", "Batata", 3, "productId1", 2),
    ];
    const order2 = new Order("Id345", "CustomerId1", items2);

    // Act
    const result = OrderService.SumOrders([order1, order2]);

    // Assert
    expect(result).toBe(12);
  });
});
