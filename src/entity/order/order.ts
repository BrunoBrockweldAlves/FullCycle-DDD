import OrderItem from "./order_item";

export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[] = [];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();

    this.validate();
  }

  total() {
    return this._items.reduce((acc, item) => acc + item.Price, 0);
  }

  validate() {
    if (this._customerId.length === 0) {
      throw new Error("Invalid CustomerId.");
    }

    if (this._id.length === 0) {
      throw new Error("Id required.");
    }

    if (this._items.length === 0) {
      throw new Error("Order must have at least one item.");
    }

    this._items.forEach((i) => i.validate());
  }

  get Total() {
    return this._total;
  }
}
