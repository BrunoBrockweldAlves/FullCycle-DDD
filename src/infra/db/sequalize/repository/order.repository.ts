import Order from "../../../../domain/entity/order/order";
import OrderItem from "../../../../domain/entity/order/order_item";
import IOrderRepository from "../../../../domain/repository/order-repository-interface";
import CustomerModel from "../model/customer.model";
import OrderItemModel from "../model/order-item.model";
import OrderModel from "../model/order.model";
import ProductModel from "../model/product.model";

export default class OrderRepository implements IOrderRepository {
  async create(entity: Order): Promise<void> {
    const items = entity.Items.map((item) => {
      return new OrderItemModel({
        id: item.Id,
        name: item.Name,
        price: item.ItemPrice,
        quantity: item.Quantity,
        order_id: entity.Id,
        product_id: item.ProductId,
      });
    });

    await OrderModel.create(
      {
        id: entity.Id,
        total: entity.Total,
        customer_id: entity.CustomerId,
        items: items,
      },
      {
        include: [
          CustomerModel,
          { model: OrderItemModel, include: [ProductModel] },
        ],
      }
    );
  }

  async update(order: Order): Promise<void> {
    try {
      // PS: Written with chatGPT. I couldn't figure a way to just set items: entity.items and make it create/update alike create.
      // PS2: I'd love to simplify this.
      // // Update the order itself
      await OrderModel.update(
        {
          total: order.Total,
          customer_id: order.CustomerId,
        },
        {
          where: { id: order.Id },
        }
      );

      // Fetch existing items from the database
      const existingItems = await OrderItemModel.findAll({
        where: { order_id: order.Id },
      });

      const existingItemIds = existingItems.map((item) => item.id);
      const updatedItemIds = order.Items.map((item) => item.Id).filter(Boolean);

      // Delete items that are no longer part of the order
      const itemsToDelete = existingItemIds.filter(
        (id) => !updatedItemIds.includes(id)
      );
      if (itemsToDelete.length > 0) {
        await OrderItemModel.destroy({
          where: { id: itemsToDelete },
        });
      }

      // Add or update items
      for (const item of order.Items) {
        if (item.Id && existingItemIds.includes(item.Id)) {
          // Update existing item
          await OrderItemModel.update(
            {
              name: item.Name,
              price: item.TotalPrice,
              quantity: item.Quantity,
              product_id: item.ProductId,
            },
            {
              where: { id: item.Id },
            }
          );
        } else {
          // Create new item
          await OrderItemModel.create({
            name: item.Name,
            price: item.TotalPrice,
            quantity: item.Quantity,
            order_id: order.Id,
            product_id: item.ProductId,
          });
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<Order> {
    const model = await OrderModel.findByPk(id, { include: [OrderItemModel] });
    return this.toDomain(model);
  }

  async findAll(): Promise<Order[]> {
    const models = await OrderModel.findAll({ include: [OrderItemModel] });
    return models.map((model) => this.toDomain(model));
  }

  toDomain(model: OrderModel): Order {
    return new Order(
      model.id,
      model.customer_id,
      model.items.map((item) => {
        return new OrderItem(
          item.id,
          model.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
        );
      })
    );
  }
}
