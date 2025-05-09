import { User } from "src/user/entity/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { orderItems } from "./order.item.detail.entity";

@Entity()
export class Order{
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User, (user) => user.orders)
    user: User;
  
    @OneToMany(() => orderItems, (orderItem) => orderItem.order, { cascade: true })
    orderItems: orderItems[];
  
    @Column({ default: true })
    isActive: boolean;
  
    @Column({
        type:"timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    createdAt: Date;
  
    @Column({
        type:"timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    updatedAt: Date;
}