import Product from "./product";

describe("Product unit tests", () => {
  it("Should throw error when id is empty", () => {
    expect(() => {
      let product = new Product("", "ProductName", 12);
    }).toThrow("Id required.");
  });

  it("Should throw error when price is negative", () => {
    expect(() => {
      let product = new Product("Id123", "ProductName", -1);
    }).toThrow("Invalid price.");
  });

  it("Should change name", () => {
    // Arrange
    let product = new Product("Id123", "ProductName", 10);
    let newProductName = "NewProductName";

    // Act
    product.changeName(newProductName);
    // Assert
    expect(product.name).toBe(newProductName);
  });

  it("Should change price", () => {
    // Arrange
    let product = new Product("Id123", "ProductName", 10);
    let newPrice = 15;

    // Act
    product.changePrice(newPrice);
    // Assert
    expect(product.price).toBe(newPrice);
  });
});
