import { Product } from 'src/product/entity/product.entity';
import { User } from 'src/user/entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  rate: number;
  @Column()
  comment: string;
  @ManyToOne(() => User, (user) => user.ratings)
  user: User;
  @ManyToOne(() => Product, (product) => product.ratings)
  product: Product;
  @Column({ default: true })
  isActive: boolean;
}
