import Product from "../../../domain/product/entity/product";
import IProductRepository from "../../../domain/product/repository/product-repository-interface";
import ProductModel from "../model/product.model";

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

  async findById(id: string): Promise<Product> {
    const model = await ProductModel.findByPk(id);

    return new Product(model.id, model.name, model.price);
  }

  async findAll(): Promise<Product[]> {
    return (await ProductModel.findAll()).map(
      (model) => new Product(model.id, model.name, model.price)
    );
  }
}
