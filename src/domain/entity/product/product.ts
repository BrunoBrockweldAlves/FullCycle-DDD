export default class Product {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;

    this.validate();
  }

  validate() {
    if (this._name.length === 0) {
      throw new Error("Invalid name.");
    }

    if (this._id.length === 0) {
      throw new Error("Id required.");
    }

    if (this._price <= 0) {
      throw new Error("Invalid price.");
    }
  }

  changePrice(newPrice: number) {
    this._price = newPrice;
  }

  get price() {
    return this._price;
  }

  changeName(newName: string) {
    this._name = newName;
  }

  get name() {
    return this._name;
  }
}
