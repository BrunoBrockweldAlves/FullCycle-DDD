import ProductModel from "../model/product.model";
import ProductRepository from "./product.repository";
import Product from "../../../../domain/product/entity/product";
import { Sequelize } from "sequelize-typescript";
import OrderItemModel from "../model/order-item.model";
import OrderModel from "../model/order.model";
import CustomerModel from "../model/customer.model";

describe("Product repository tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
      models: [ProductModel, OrderItemModel, OrderModel, CustomerModel],
    });
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should create a product", async () => {
    // Arrange
    const productRepository = new ProductRepository();

    let product = new Product("Id123", "ProductName", 10);

    // Act
    await productRepository.create(product);

    // Assert
    let productModel = await ProductModel.findOne({
      where: { id: product.id },
    });

    expect(productModel).not.toBe(undefined);
    expect(productModel.name).toBe(product.name);
    expect(productModel.price).toBe(product.price);

    // Alternative comparison
    expect(productModel.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });

  it("Should update a product", async () => {
    // Arrange
    const productRepository = new ProductRepository();
    let product = new Product("Id123", "ProductName", 10);
    await productRepository.create(product);

    // Act
    let updatedName = "UpdatedName";
    product.changeName(updatedName);
    await productRepository.update(product);

    // Assert
    let productModel = await ProductModel.findOne({
      where: { id: product.id },
    });

    expect(productModel.name).toBe(updatedName);
  });

  it("Should find by id", async () => {
    // Arrange
    const productRepository = new ProductRepository();
    let product = new Product("Id123", "ProductName", 10);
    await productRepository.create(product);

    // Act
    var result = await productRepository.findById(product.id);

    // Assert
    expect(result).toStrictEqual(product);
  });

  it("Should find all", async () => {
    // Arrange
    const productRepository = new ProductRepository();
    let product1 = new Product("Id123", "ProductName1", 10);
    let product2 = new Product("Id345", "ProductName2", 20);
    await productRepository.create(product1);
    await productRepository.create(product2);

    // Act
    var result = await productRepository.findAll();

    // Assert
    expect(result.length).toBe(2);
    expect(result).toStrictEqual([product1, product2]);
  });
});
