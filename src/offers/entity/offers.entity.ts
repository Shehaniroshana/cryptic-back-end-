import { Product } from "src/product/entity/product.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Offers{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    title:string;
    @Column(
        {
            type:'float'
        }
    )
    discount:number;
    @Column()
    startDate:Date;
    @Column()
    endDate:Date;
    @ManyToOne(()=> Product, (product)=> product.offers)
    product:Product;
    @Column({
        default:true
    })
    isActive:boolean
}