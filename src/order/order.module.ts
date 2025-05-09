import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entity/order.entity';
import { orderItems } from './entity/order.item.detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [OrderService],
  controllers: [OrderController],
  imports:[
    TypeOrmModule.forFeature([Order,orderItems]),ProductModule,UserModule]
})
export class OrderModule {}
