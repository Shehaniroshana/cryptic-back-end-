import { Product } from "src/product/entity/product.entity";
import { User } from "src/user/entity/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rating{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    rate:number;
    @Column()
    comment:string;
    @ManyToOne(()=>User,(user)=>user.ratings)
    user:User;
    @ManyToOne(()=>Product,(product)=>product.ratings)
    product:Product
    @Column({default:true})
    isActive:boolean
}