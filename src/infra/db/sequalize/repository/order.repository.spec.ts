import { Sequelize } from "sequelize-typescript";
import OrderModel from "../model/order.model";
import OrderRepository from "./order.repository";
import Order from "../../../../domain/entity/order/order";
import OrderItem from "../../../../domain/entity/order/order_item";
import OrderItemModel from "../model/order-item.model";
import CustomerModel from "../model/customer.model";
import ProductModel from "../model/product.model";
import Customer from "../../../../domain/entity/customer/customer";
import Address from "../../../../domain/entity/customer/valueObject/address";
import CustomerRepository from "./customer.repository";
import Product from "../../../../domain/entity/product/product";
import ProductRepository from "./product.repository";

describe("Order repository tests", () => {
  let sequelize: Sequelize;
  let _customerId = "Customer123";
  let _product: Product;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      OrderModel,
      OrderItemModel,
      CustomerModel,
      ProductModel,
    ]);
    await sequelize.sync();

    //#region SetupCustomer
    const customer = new Customer(_customerId, "Name");
    const address = new Address("Rua tal", 123, "80820-010", "Curitiba");
    customer.Address = address;
    customer.activate();

    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer);
    //#endregion

    //#region SetupProduct
    const productRepository = new ProductRepository();

    _product = new Product("Product123", "ProductName", 10);

    await productRepository.create(_product);
    //#endregion
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should create an order", async () => {
    // Arrange
    const orderRepository = new OrderRepository();

    let item = new OrderItem(
      "Id123",
      "Order123",
      _product.name,
      _product.price,
      _product.id,
      3
    );
    const order = new Order("Order123", _customerId, [item]);

    // Act
    await orderRepository.create(order);

    // Assert
    let orderModel = await OrderModel.findOne({
      where: { id: order.Id },
      include: [
        CustomerModel,
        { model: OrderItemModel, include: [ProductModel] },
      ],
    });

    expect(orderModel).not.toBe(undefined);
    expect(orderModel.total).toBe(order.Total);
    expect(orderModel.customer_id).toBe(order.CustomerId);
  });

  it("Should update an order", async () => {
    // Arrange
    const orderRepository = new OrderRepository();

    let item = new OrderItem(
      "Id123",
      "Order123",
      _product.name,
      _product.price,
      _product.id,
      3
    );
    const order = new Order("Order123", _customerId, [item]);
    await orderRepository.create(order);

    let item2 = new OrderItem(
      "Id345",
      "Order123",
      _product.name,
      _product.price,
      _product.id,
      3
    );
    order.updateItems([item, item2]);

    // Act
    await orderRepository.update(order);

    // Assert
    let orderModel = await OrderModel.findOne({
      where: { id: order.Id },
      include: [
        CustomerModel,
        { model: OrderItemModel, include: [ProductModel] },
      ],
    });

    expect(orderModel.items.length).toBe(2);
  });

  it("Should find order by id", async () => {
    // Arrange
    const orderRepository = new OrderRepository();

    let item = new OrderItem(
      "Id123",
      "Order123",
      _product.name,
      _product.price,
      _product.id,
      3
    );
    const order = new Order("Order123", _customerId, [item]);
    await orderRepository.create(order);

    // Act
    let orderResult = await orderRepository.findById(order.Id);

    // Assert
    expect(orderResult).not.toBe(undefined);
    expect(orderResult.Items.length).toBe(1);
    expect(orderResult.Total).toBe(order.Total);
    expect(orderResult.CustomerId).toBe(order.CustomerId);
  });

  it("Should find all orders", async () => {
    // Arrange
    const orderRepository = new OrderRepository();

    let item = new OrderItem(
      "Id123",
      "Order123",
      _product.name,
      _product.price,
      _product.id,
      3
    );
    const order = new Order("Order123", _customerId, [item]);
    await orderRepository.create(order);

    let item2 = new OrderItem(
      "Id321",
      "Order321",
      _product.name,
      _product.price,
      _product.id,
      3
    );
    const order2 = new Order("Order321", _customerId, [item2]);
    await orderRepository.create(order2);

    // Act
    let orderResults = await orderRepository.findAll();

    // Assert
    expect(orderResults).not.toBe(undefined);
    expect(orderResults.length).toBe(2);
  });
});
