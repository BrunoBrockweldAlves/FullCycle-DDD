import Address from "../entity/valueObject/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit tests", () => {
  it("should create customer", () => {
    // Arrange
    let customer = CustomerFactory.createCustomer("John");

    // Assert
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.Address).toBeUndefined();
  });

  it("should create customer with an address", () => {
    // Arrange
    let address = new Address("Rua tal", 123, "80820-000", "Curitiba");
    let customer = CustomerFactory.createWithAddress("John", address);

    // Assert
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.Address).toBe(address);
  });
});
