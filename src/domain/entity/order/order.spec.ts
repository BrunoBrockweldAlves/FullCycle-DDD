import OrderItem from "./order_item";
import Order from "./order";

describe("Order unit tests", () => {
  it("Should throw error when id is empty", () => {
    expect(() => {
      let order = new Order("", "CustomerId1", []);
    }).toThrow("Id required.");
  });

  it("Should throw error when id is empty", () => {
    expect(() => {
      let order = new Order("Id123", "CustomerId1", []);
    }).toThrow("Order must have at least one item.");
  });

  it("Should sum value right", () => {
    // Arrange
    let items = [
      new OrderItem("Id123", "Batata", 3, "productId1", 2),
      new OrderItem("Id124", "Cebola", 2.5, "productId2", 3),
    ];

    // Act
    const order = new Order("Id123", "CustomerId1", items);

    // Assert
    expect(order.Total).toBe(13.5);
  });

  it("Should throw error if orderItem quantity is less or equal 0", () => {
    expect(() => {
      let items = [
        new OrderItem("Id123", "Batata", 3, "productId1", 0),
        new OrderItem("Id124", "Cebola", 2.5, "productId2", 3),
      ];
      const order = new Order("Id123", "CustomerId1", items);
    }).toThrow("Quantity should be bigger than zero.");
  });
});
