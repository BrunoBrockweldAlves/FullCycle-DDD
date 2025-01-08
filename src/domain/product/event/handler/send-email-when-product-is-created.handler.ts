import IEventHandler from "../../../events/@shared/event-handler.interface";
import ProductCreatedEvent from "../product-created.event";

export default class SendEmailWhenProductIsCreatedHandler
  implements IEventHandler<ProductCreatedEvent>
{
  handle(event: any): void {
    console.log("Sending email...", event);
  }
}
