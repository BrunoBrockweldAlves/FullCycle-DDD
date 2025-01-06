import IEventHandler from "./event-handler.interface";
import IEvent from "./event.interface";

export default interface IEventDispatcher<T extends IEvent = IEvent> {
  notify(event: T): void;
  register(eventName: string, handler: IEventHandler): void;
  unregister(eventName: string, handler: IEventHandler): void;
  unregisterAll(): void;
}
