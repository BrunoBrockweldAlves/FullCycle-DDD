import IEventHandler from "../../@shared/event-handler.interface";
import CusomerCreatedEvent from "../customer-created.event";

export default class ConsoleLogWhenCustomerIsCreatedHandler
  implements IEventHandler<CusomerCreatedEvent>
{
  handle(event: any): void {
    console.log("Customer created...", event);
  }
}