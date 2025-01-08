import Product from "../../entity/product/product";
import ProductService from "./product.service";

describe("Order service tests", () => {
  it("Should alter the price of all orders.", () => {
    const product1 = new Product("Id1", "ProductName", 12);
    const product2 = new Product("Id2", "ProductName", 12);

    const products = [product1, product2];

    ProductService.changePrice(products, 100);

    expect(product1.price).toBe(100);
    expect(product2.price).toBe(100);
  });
});
