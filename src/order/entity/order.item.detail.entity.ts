import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "src/product/entity/product.entity";

@Entity()
export class orderItems{

    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Order, (order) => order.orderItems)
    order: Order;
  
    @ManyToOne(()=>Product,(product)=>product.orderItems)
    product:Product
  
    @Column()
    quantity: number;
    
    @Column()
    price: number;
    

}