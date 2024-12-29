import Product from "../../domain/entity/product/product";
import IProductRepository from "../../domain/repository/product-repository-interface";
import ProductModel from "../db/sequalize/model/product.model";

export default class ProductRepository implements IProductRepository {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    });
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update(
      {
        id: entity.id,
        name: entity.name,
        price: entity.price,
      },
      { where: { id: entity.id } }
    );
  }

  async find(id: string): Promise<Product> {
    throw new Error("Method not implemented.");
  }

  async findAll(): Promise<Product[]> {
    throw new Error("Method not implemented.");
  }
}
