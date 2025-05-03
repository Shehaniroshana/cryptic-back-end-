import { isEnum } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}