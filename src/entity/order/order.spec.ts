import OrderItem from "./orderItem";
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
    let itens = [
      new OrderItem("Id123", "Batata", 3),
      new OrderItem("Id124", "Cebola", 2.5),
    ];

    // Act
    const order = new Order("Id123", "CustomerId1", itens);

    // Assert
    expect(order.Total).toBe(5.5);
  });
});
