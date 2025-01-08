import { Json } from "sequelize/types/utils";
import CustomerAddressChangedEvent from "../customer/customer-address-changed.event";
import CustomerCreatedEvent from "../customer/customer-created.event";
import ConsoleLogWhenCustomerAddressIsChangedHandler from "../customer/handler/console-log-when-customer-address-is-changed.handler";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("EventDispatcher tests", () => {
  it("should register an event handler", () => {
    //Arrange
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    let eventName = "ProductCreatedEvent";

    //Act
    eventDispatcher.register(eventName, eventHandler);

    //Assert
    expect(eventDispatcher.getEventHandlers[eventName]).toBeDefined();
    expect(eventDispatcher.getEventHandlers[eventName].length).toBe(1);
    expect(eventDispatcher.getEventHandlers[eventName]).toMatchObject(
      eventHandler
    );
  });

  it("should unregister an event handler", () => {
    //Arrange
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    let eventName = "ProductCreatedEvent";
    eventDispatcher.register(eventName, eventHandler);

    //Act
    eventDispatcher.unregister(eventName, eventHandler);

    //Assert
    expect(eventDispatcher.getEventHandlers[eventName]).toBeDefined();
    expect(eventDispatcher.getEventHandlers[eventName].length).toBe(0);
  });

  it("should unregister all event handlers", () => {
    //Arrange
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    let eventName = "ProductCreatedEvent";
    eventDispatcher.register(eventName, eventHandler);

    //Act
    eventDispatcher.unregisterAll();

    //Assert
    expect(eventDispatcher.getEventHandlers[eventName]).toBeUndefined();
  });

  it("should notify an event", () => {
    //Arrange
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    let eventName = ProductCreatedEvent.name;
    eventDispatcher.register(eventName, eventHandler);
    const event = new ProductCreatedEvent({
      name: "Product 1",
      description: "Very nice Product",
      price: 10,
    });

    const spyHandler = jest.spyOn(eventHandler, "handle");
    //Act
    eventDispatcher.notify(event);

    //Assert
    expect(spyHandler).toHaveBeenCalled();
  });

  it("should call all registered handlers when event is notified", () => {
    //Arrange
    const eventDispatcher = new EventDispatcher();
    const firstEventHandler =
      new ConsoleLogWhenCustomerAddressIsChangedHandler();
    const seccondEventHandler =
      new ConsoleLogWhenCustomerAddressIsChangedHandler();

    let eventName = CustomerCreatedEvent.name;

    eventDispatcher.register(eventName, firstEventHandler);
    eventDispatcher.register(eventName, seccondEventHandler);

    const event = new CustomerCreatedEvent({
      id: 1,
      name: "Customer Foo Bar",
      active: true,
    });

    const spyFirstHandler = jest.spyOn(firstEventHandler, "handle");
    const spySeccondHandler = jest.spyOn(seccondEventHandler, "handle");

    //Act
    eventDispatcher.notify(event);

    //Assert
    expect(spyFirstHandler).toHaveBeenCalledTimes(1);
    expect(spySeccondHandler).toHaveBeenCalledTimes(1);
  });

  it("should notify when customer address is changed", () => {
    //Arrange
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new ConsoleLogWhenCustomerAddressIsChangedHandler();
    let eventName = CustomerAddressChangedEvent.name;
    eventDispatcher.register(eventName, eventHandler);
    const event = new CustomerAddressChangedEvent({
      id: 1,
      nome: "Customer Foo Bar",
      endereco: JSON.stringify({
        rua: "Rua tal",
        numero: 123,
        cep: "80820-010",
        cidade: "Curitiba",
      }),
    });

    const spyHandler = jest.spyOn(eventHandler, "handle");
    //Act
    eventDispatcher.notify(event);

    //Assert
    expect(spyHandler).toHaveBeenCalledTimes(1);
  });
});
