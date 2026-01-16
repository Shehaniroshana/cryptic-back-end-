import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  @HttpCode(201)
  async createOrder(@Body() order: OrderDto): Promise<any> {
    const orderCreated = await this.orderService.createOrder(order);
    return { message: 'Order created successfully', orderCreated };
  }

  @Get()
  async getAll(): Promise<any> {
    const orders = await this.orderService.getAll();
    return { message: 'Order fetched successfully', orders };
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: number): Promise<any> {
    const orderDeleted = await this.orderService.deleteOrder(id);
    return { message: 'Order deleted successfully', orderDeleted };
  }

  @Get(':id')
  async getOrderById(@Param('id') id: number): Promise<any> {
    const order = await this.orderService.getOrderById(id);
    return { message: 'Order fetched successfully', order };
  }

  @Put('update')
  async updateOrder(@Body() order: OrderDto): Promise<any> {
    const orderUpdated = await this.orderService.updateOrder(order);
    return { message: 'Order updated successfully', orderUpdated };
  }
}
