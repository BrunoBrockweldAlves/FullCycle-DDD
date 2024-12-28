import Customer from "./customer";
import Address from "./valueObject/address";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let customer = new Customer("", "Nome");
      console.log(customer);
    }).toThrow("Id required.");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer("123", "");
      console.log(customer);
    }).toThrow("Invalid name.");
  });

  it("should change name", () => {
    // Arrange
    const customer = new Customer("123", "Name");

    // Act
    customer.changeName("NewName");

    // Assert
    expect(customer.name).toBe("NewName");
  });

  it("should activate customer", () => {
    // Arrange
    const customer = new Customer("123", "Name");
    const address = new Address("Rua tal", 123, "80820-010", "Curitiba");
    customer.Address = address;

    // Act
    customer.activate();

    // Assert
    expect(customer.isActive).toBeTruthy();
  });

  it("should deactivate customer", () => {
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

  //teste
});
