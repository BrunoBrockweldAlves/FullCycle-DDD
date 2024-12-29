export default class OrderItem {
  private _id: string;
  private _name: string;
  private _price: number;
  private _productId: string;
  private _quantity: number;

  constructor(
    id: string,
    name: string,
    price: number,
    productId: string,
    quantity: number
  ) {
    this._id = id;
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

  get Price() {
    return this._price * this._quantity;
  }
}
