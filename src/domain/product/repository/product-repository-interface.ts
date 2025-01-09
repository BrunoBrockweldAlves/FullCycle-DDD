import Product from "../entity/product";
import IRepository from "../../repository/repository-interface";

export default interface IProductRepository extends IRepository<Product> {}
