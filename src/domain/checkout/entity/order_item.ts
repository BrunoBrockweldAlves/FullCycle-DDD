import Product from "../../product/entity/product";

export default class OrderItem {
  private _id: string;
  private _name: string;
  private _price: number;
  private _quantity: number;
  private _orderId: string;

  private _productId: string;
  private _product: Product;

  constructor(
    id: string,
    orderId: string,
    name: string,
    price: number,
    productId: string,
    quantity: number
  ) {
    this._id = id;
    this._orderId = orderId;
    this._name = name;
    this._price = price;
    this._productId = productId;
    this._quantity = quantity;
  }

  validate() {
    if (this._price <= 0) throw new Error("Price should be bigger than zero.");
    if (this._quantity <= 0)
      throw new Error("Quantity should be bigger than zero.");
  }

  get TotalPrice() {
    return this._price * this._quantity;
  }

  get ItemPrice() {
    return this._price;
  }

  get Id() {
    return this._id;
  }

  get Name() {
    return this._name;
  }

  get Quantity() {
    return this._quantity;
  }

  get OrderId() {
    return this._orderId;
  }

  get ProductId() {
    return this._productId;
  }

  set Product(product: Product) {
    this._product = product;
  }

  get Product() {
    return this._product;
  }
}
