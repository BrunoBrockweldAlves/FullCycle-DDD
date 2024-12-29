import { Sequelize } from "sequelize-typescript";
import ProductModel from "../db/sequalize/model/product.model";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product/product";

describe("Product repository tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
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
    expect(productModel.toJSON()).toStrictEqual(productModel.toJSON());
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
});
