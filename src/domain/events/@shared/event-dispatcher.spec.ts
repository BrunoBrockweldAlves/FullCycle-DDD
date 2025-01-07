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
});
