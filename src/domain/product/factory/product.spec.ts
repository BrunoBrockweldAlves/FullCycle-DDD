import ProductFactory from "./product.factory";

describe("Product factory unit tests", () => {
  it("should create product type a", () => {
    // Arrange
    const product = ProductFactory.create("a", "ProductA", 10);

    // Assert
    expect(product.id).toBeDefined();
    expect(product.name).toBe("ProductA");
    expect(product.price).toBe(10);
    expect(product.constructor.name).toBe("Product");
  });

  it("should create product type b", () => {
    // Arrange
    const product = ProductFactory.create("b", "ProductB", 10);

    // Assert
    expect(product.id).toBeDefined();
    expect(product.name).toBe("ProductB");
    expect(product.price).toBe(20);
    expect(product.constructor.name).toBe("ProductB");
  });

  it("should throw error when type is not supported", () => {
    // Arrange
    const product = () => ProductFactory.create("z", "ProductB", 10);

    // Assert
    expect(product).toThrow("Invalid product type.");
    // Other way to assert:
    expect(() => ProductFactory.create("z", "ProductB", 10)).toThrow(
      "Invalid product type."
    );
  });
});
