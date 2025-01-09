import IEvent from "../../@shared/event.interface";

export default class CusomerCreatedEvent implements IEvent {
  dateTimeOccurred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dateTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
