import IEventDispatcher from "./event-dispatcher.interface";
import IEventHandler from "./event-handler.interface";
import IEvent from "./event.interface";

export default class EventDispatcher implements IEventDispatcher {
  private eventHandlers: { [eventName: string]: IEventHandler[] } = {};

  get getEventHandlers(): { [eventName: string]: IEventHandler[] } {
    return this.eventHandlers;
  }

  register(eventName: string, handler: IEventHandler): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(handler);
  }
  notify(event: IEvent): void {
    throw new Error("Method not implemented.");
  }
  unregister(eventName: string, handler: IEventHandler): void {
    throw new Error("Method not implemented.");
  }
  unregisterAll(): void {
    throw new Error("Method not implemented.");
  }
}
