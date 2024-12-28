import Customer from "./entity/customer/customer";
import Address from "./entity/customer/valueObject/address";
import Order from "./entity/order";
import OrderItem from "./entity/order/order_item";

let customer = new Customer("123", "Bruno Brock");
const address = new Address("Rua Tal", 332, "80820-010", "Curitiba");

customer.Address = address;
customer.activate();

const item1 = new OrderItem("Id1", "Item1", 22.55);
const item2 = new OrderItem("Id2", "Item2", 33.55);
const item3 = new OrderItem("Id3", "Item3", 44.55);

const order = new Order("OrderId1", customer.id, [item1, item2, item3]);
