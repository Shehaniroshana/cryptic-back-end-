import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  async createOrder(@Body() order: OrderDto): Promise<any> {
    const orderCreated = await this.orderService.createOrder(order);
    return { message: 'Order created successfully', orderCreated };
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async getAll(): Promise<any> {
    const orders = await this.orderService.getAll();
    return { message: 'Order fetched successfully', orders };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async deleteOrder(@Param('id') id: number): Promise<any> {
    const orderDeleted = await this.orderService.deleteOrder(id);
    return { message: 'Order deleted successfully', orderDeleted };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getOrderById(@Param('id') id: number): Promise<any> {
    const order = await this.orderService.getOrderById(id);
    return { message: 'Order fetched successfully', order };
  }

  @Put('update')
  @UseGuards(JwtAuthGuard)
  async updateOrder(@Body() order: OrderDto): Promise<any> {
    const orderUpdated = await this.orderService.updateOrder(order);
    return { message: 'Order updated successfully', orderUpdated };
  }
}
