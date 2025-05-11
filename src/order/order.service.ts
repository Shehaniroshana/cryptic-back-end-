import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { orderItems } from './entity/order.item.detail.entity';
import { User } from 'src/user/entity/user.entity';
import { Product } from 'src/product/entity/product.entity';
import { Repository } from 'typeorm';
import { OrderDto } from './dto/order.dto';
import { plainToInstance } from 'class-transformer';
import e from 'express';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private orderRepo: Repository<Order>,
        @InjectRepository(User)
        private userRepo: Repository<User>,
        @InjectRepository(Product)
        private productRepo: Repository<Product>
    ) { }

    async createOrder(order: OrderDto): Promise<Order> {
        try {
            if (! await this.userRepo.findOne({ where: { id: order.user } })) throw new BadRequestException('User not found');
            for (const orderItem of order.orderItems) {
                if (!await this.productRepo.findOne({ where: { id: orderItem.product } })) throw new BadRequestException(`Product not found ${orderItem.product}`);
            }
            const newOrder = plainToInstance(Order, order);
            return this.orderRepo.save(newOrder);
        } catch (error) {
            throw error;
        }
    }

    async getAll():Promise<Order[]>{
        try{
            const orders=await this.orderRepo.find({relations:{user:true,orderItems:{product:true}}});
            return orders;
        }catch(error){
            throw error;
            new BadRequestException(error)
        }
    }

    async getOrderById(id:number):Promise<Order> {
        try {
            if (!id) throw new BadRequestException('Order id is required');
            const order = await this.orderRepo.findOne({ where: { id }, relations: { user: true, orderItems: { product: true } } });
            if (!order) throw new BadRequestException('Order not found');
            return order;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteOrder(id: number): Promise<Order> {
        try {
            if (!id) throw new BadRequestException('Order id is required');
            const orderToDelete = await this.orderRepo.findOne({ where: { id } });
            if (!orderToDelete) throw new BadRequestException('Order not found');
            orderToDelete.isActive = false;
            return await this.orderRepo.save(orderToDelete);            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateOrder(order: OrderDto): Promise<Order> {
        try {
            if (!order.id) throw new BadRequestException('Order id is required');
            if (!await this.orderRepo.findOne({ where: { id: order.id } })) throw new BadRequestException('Order not found');
            return this.orderRepo.save(plainToInstance(Order, order));
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    
}
