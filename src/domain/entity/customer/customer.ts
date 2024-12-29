import Address from "./valueObject/address";

export default class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = true;

  constructor(_id: string, _name: string) {
    this._id = _id;
    this._name = _name;

    this.validate();
  }

  validate() {
    if (this._name.length === 0) {
      throw new Error("Invalid name.");
    }

    if (this._id.length === 0) {
      throw new Error("Id required.");
    }
  }

  changeName(name: string) {
    this._name = name;
  }

  activate() {
    if (!this._address) {
      throw Error("Address is mandatory to activate Customer.");
    }
    this._active = true;
  }

  isActive() {
    return this._active;
  }

  deactivate() {
    this._active = false;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get Address(): Address {
    return this._address;
  }

  set name(name: string) {
    this._name = name;
  }

  set Address(address: Address) {
    this._address = address;
  }
}
