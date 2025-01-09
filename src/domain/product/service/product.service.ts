import Product from "../entity/product";

export default class ProductService {
  static changePrice(products: Product[], newPrice: number) {
    products.forEach((p) => p.changePrice(newPrice));
  }
}
