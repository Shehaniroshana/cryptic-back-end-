import { isEnum } from "class-validator";
import { Product } from "src/product/entity/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

enum Role{
    customer="CUSTOMER",
    admin="ADMIN",
    seller="SELLER"
}
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    email:string;
    @Column()
    password:string;
    @Column({
        type:"enum",
        enum:Role,
        default:Role.customer
    })
    role:Role;
    @Column({default:true})
    isActive:boolean;

    @OneToMany(()=>Product,(product)=>product.seller)
    products:Product[];
}