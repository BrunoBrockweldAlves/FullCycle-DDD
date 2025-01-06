import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import EventDispatcher from "./event-dispatcher";

describe("EventDispatcher tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    let eventName = "ProductCreatedEvent";
    eventDispatcher.register(eventName, eventHandler);
    expect(eventDispatcher.getEventHandlers[eventName]).toBeDefined();
    expect(eventDispatcher.getEventHandlers[eventName].length).toBe(1);
  });
});
