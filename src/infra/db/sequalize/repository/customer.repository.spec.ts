import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/entity/valueObject/address";

describe("Customer repository tests", () => {
  it("Should create Customer", () => {
    // Arrange
    const customer = new Customer("123", "Name");
    const address = new Address("Rua tal", 123, "80820-010", "Curitiba");
    customer.Address = address;
    customer.activate();

    // Act
    customer.deactivate();

    // Assert
    expect(customer.isActive).toBeTruthy();
  });
});
