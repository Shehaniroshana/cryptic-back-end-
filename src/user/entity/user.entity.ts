import { Order } from 'src/order/entity/order.entity';
import { Product } from 'src/product/entity/product.entity';
import { Rating } from 'src/ratings/entity/ratings.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  customer = 'CUSTOMER',
  admin = 'ADMIN',
  seller = 'SELLER',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.customer,
  })
  role: Role;
  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Product, (product) => product.seller)
  products: Product[];

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[];
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
