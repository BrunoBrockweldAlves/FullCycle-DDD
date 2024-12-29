import Product from "../entity/product/product";
import IRepository from "./repository-interface";

export default interface IProductRepository extends IRepository<Product> {}
